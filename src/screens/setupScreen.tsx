import React, {useState, useContext} from 'react';
import {View, TouchableHighlight, Alert} from 'react-native';
import {TextComponent, TextInputComponent} from '../components';
import {
  setInitialValues,
  fetchTimetable,
  fetchCourseName,
} from '../utils/helpers';
import {RefreshContext} from '../utils/Context';

const SetupScreen = () => {
  const [course, setCourse] = useState<string | null>(null);
  const [lab, onChangeLab] = useState<string | null>(null);
  const [computerLab, onChangeComputerLab] = useState<string | null>(null);
  const [project, onChangeProject] = useState<string | null>(null);
  const [english, onChangeEnglish] = useState<string | null>(null);
  const useRefresh = useContext(RefreshContext);
  const [courseName, setCourseName] = useState<string>('No course');

  const showAlert = () => {
    Alert.alert(
      'Not all values set',
      'Please fill all the fields to continue.',
      [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const handleSubmit = () => {
    let groups = [];
    course && lab && computerLab && project && english
      ? ((groups = [
          `l${lab}`,
          `k${computerLab}`,
          `p${project}`,
          english,
          'all',
        ]),
        setInitialValues(parseInt(course), groups).then(() =>
          fetchTimetable(true).then(() => useRefresh('submit')),
        ))
      : (console.log('not all values set'), showAlert());
  };

  const onChangeCourse = (text: string) => {
    setCourse(text);
    text
      ? fetchCourseName(parseInt(text))
          .then(data => data && setCourseName(data))
          .catch(err => setCourseName('Not found'))
      : setCourseName('No course');
  };

  //on change plan remove values

  return (
    <View className="flex-1 py-8 px-4 bg-[#121212]">
      <TextComponent>Enter your course number:</TextComponent>
      <TextInputComponent
        inputMode="numeric"
        maxLength={2}
        onChangeText={text => onChangeCourse(text)}
      />
      <TextComponent className="-mt-6 mb-6">{`Selected course: ${courseName}`}</TextComponent>
      <TextComponent>Lab group number:</TextComponent>
      <TextInputComponent
        inputMode="numeric"
        maxLength={2}
        onChangeText={text => onChangeLab(text)}
      />
      <TextComponent>Computer lab group number:</TextComponent>
      <TextInputComponent
        inputMode="numeric"
        maxLength={2}
        onChangeText={text => onChangeComputerLab(text)}
      />
      <TextComponent>Project group number:</TextComponent>
      <TextInputComponent
        inputMode="numeric"
        maxLength={2}
        onChangeText={text => onChangeProject(text)}
      />
      <TextComponent>English group:</TextComponent>
      <TextInputComponent
        inputMode="text"
        maxLength={3}
        onChangeText={text => onChangeEnglish(text)}
      />
      <TouchableHighlight
        className="py-4 px-8 items-center rounded-2xl"
        onPress={() => handleSubmit()}>
        <TextComponent>Submit</TextComponent>
      </TouchableHighlight>
    </View>
  );
};
//TODO also fetch course name

export default SetupScreen;
