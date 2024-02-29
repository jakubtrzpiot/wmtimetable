import {Dispatch, SetStateAction, useContext} from 'react';
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ButtonComponent, TextComponent} from '../core';
import {ThemeContext} from '../../utils/context';

interface noteRemoveProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  removeNote: (confirm: boolean) => void;
}

const noteRemoveModal: React.FC<noteRemoveProps> = ({
  open,
  setOpen,
  removeNote,
}) => {
  const colorHex = useContext(ThemeContext);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={() => setOpen(false)}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setOpen(false)}
        className="flex-1 items-center justify-center bg-[#121212]/75">
        <TouchableWithoutFeedback>
          <View
            style={{borderColor: colorHex}}
            className={`w-3/4 p-4 bg-[#121212] border-2 rounded-[32px] flex-col items-center`}>
            <TextComponent className="mb-8 text-base text-center">
              Czy na pewno chcesz usunąć tę notatkę?
            </TextComponent>
            <View className="flex-row w-full justify-around pb-2">
              <ButtonComponent text={'Nie'} onPress={() => removeNote(false)} />
              <ButtonComponent text={'Tak'} onPress={() => removeNote(true)} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};
