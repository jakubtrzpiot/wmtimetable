import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import WeekDay from './weekDay';
import WeekType from './weekType';
import {IconComponent} from '../../core';
import asyncStorage from '../../../utils/asyncStorage';
import {RefreshContext} from '../../../utils/context';
import NotesScreen from '../../../screens/notesScreen';
import {useNoteCount} from '../../../utils/hooks';

interface TopBarProps {
  week: string;
}

const TopBar: React.FC<TopBarProps> = ({week}: TopBarProps) => {
  const [courseName, setCourseName] = useState<string>('');
  const [notesOpen, setNotesOpen] = useState<boolean>(false);
  const useRefresh = useContext(RefreshContext);
  const noteCount = useNoteCount();

  useEffect(() => {
    asyncStorage
      .getItem('courseName')
      .then(data => data && setCourseName(data));
  }, []);

  const handlePlanChange = () => {
    useRefresh('setup');
  };

  return (
    <View className="flex-row justify-between items-center">
      <View className="px-4 pb-2">
        <WeekDay />
        <WeekType weekType={week} />
      </View>
      <View className="flex-row items-center justify-end">
        {noteCount !== 0 && (
          <IconComponent
            className="px-5 py-2"
            size={24}
            name="notebook"
            indicator={noteCount}
            center
            onPress={() => setNotesOpen(!notesOpen)}
          />
        )}
        <IconComponent
          className="pr-4 pl-5 py-2"
          name="calendar"
          size={24}
          label={courseName}
          onPress={() => handlePlanChange()}
        />
      </View>
      <NotesScreen
        visible={notesOpen}
        onRequestClose={() => setNotesOpen(false)}
      />
    </View>
  );
};

export default TopBar;
