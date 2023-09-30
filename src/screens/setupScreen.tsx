import React, {useState, useContext, useEffect} from 'react';
import {View, Alert, Modal} from 'react-native';
import {
  TextComponent,
  LabeledComponent,
  LabeledTextInputComponent,
  SwitchComponent,
  Loader,
  ButtonComponent,
} from '../components/core';
import {
  setInitialValues,
  fetchTimetable,
  fetchCourseName,
} from '../utils/helpers';
import {RefreshContext} from '../utils/context';
import asyncStorage from '../utils/asyncStorage';

const SetupScreen = ({isSetup}: {isSetup: boolean}) => {
  //TODO refactor this mess
  const [course, setCourse] = useState<string>('');
  const [previousCourse, setPreviousCourse] = useState<string>('');
  const [lab, onChangeLab] = useState<string>('');
  const [computerLab, onChangeComputerLab] = useState<string>('');
  const [project, onChangeProject] = useState<string>('');
  const [english, onChangeEnglish] = useState<string>('');
  const useRefresh = useContext(RefreshContext);
  const [courseName, setCourseName] = useState<string>('No course');
  const [lang, setLanguage] = useState<string>('en');
  const [toggleClicks, setToggleClicks] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(true);
  const en = lang === 'en';

  useEffect(() => {
    asyncStorage.getItem('language').then(data => {
      data
        ? (asyncStorage
            .getItem('course')
            .then(
              data =>
                data &&
                (setCourse(data),
                setPreviousCourse(data),
                fetchCourseName(parseInt(data)).then(
                  data => (data && setCourseName(data), setLoading(false)),
                )),
            ),
          data && setLanguage(data))
        : setLoading(false);
    });

    asyncStorage
      .getItem('groups')
      .then(data =>
        data?.map((group: string) => {
          if (group === 'all') return;
          switch (group[0]) {
            case 'l':
              onChangeLab(group.slice(1));
              break;
            case 'k':
              onChangeComputerLab(group.slice(1));
              break;
            case 'p':
              onChangeProject(group.slice(1));
              break;
            default:
              onChangeEnglish(group);
              break;
          }
        }),
      )
      .catch(err => console.log(err));
  }, []);

  const showAlert = (title: string, desc: string) => {
    Alert.alert(
      title,
      desc,
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
    let groups: string[] = [];
    !(course && lab && computerLab && project && english)
      ? (console.log('not all values set'),
        showAlert(
          'Not all values set',
          'Please fill all the fields to continue.',
        ))
      : parseInt(course) > 0 &&
        parseInt(lab) > 0 &&
        parseInt(lab) < 9 &&
        parseInt(computerLab) > 0 &&
        parseInt(computerLab) < 9 &&
        parseInt(project) > 0 &&
        parseInt(project) < 9 &&
        /^[a-zA-Z]{2}\d?$/.test(english)
      ? ((groups = [
          `l${lab}`,
          `k${computerLab}`,
          `p${project}`,
          english,
          'all',
        ]),
        setInitialValues(parseInt(course), groups, lang, courseName).then(() =>
          fetchTimetable(
            !(course === previousCourse) || !(toggleClicks % 2 === 0),
          ).then(
            () => (
              useRefresh('submit'), useRefresh('lang'), setModalOpen(false)
            ),
          ),
        ))
      : (console.log('incorrect values'), showAlert('Incorrect values', ''));
  };

  const handleBack = () => {
    setModalOpen(false);
    useRefresh('setup');
  };

  const onChangeCourse = (text: string, invert: boolean = false) => {
    setCourse(text);
    text
      ? fetchCourseName(parseInt(text))
          .then(data => data && setCourseName(data))
          .catch(err =>
            setCourseName((invert ? !en : en) ? 'Not found' : 'Nie znaleziono'),
          )
      : setCourseName((invert ? !en : en) ? 'No course' : 'Brak kierunku');
  };

  const handleLanguageChange = () => {
    setLanguage(en ? 'pl' : 'en');
    setToggleClicks(toggleClicks + 1);
    onChangeCourse(course, true);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalOpen}
      onRequestClose={() => !isSetup && handleBack()}>
      {(!loading && (
        <View className="flex-1 px-4 mt-20 bg-[#121212]">
          <LabeledTextInputComponent
            underline
            label={en ? 'Enter your course number:' : 'Wpisz numer planu:'}
            inputMode="numeric"
            maxLength={2}
            onChangeText={text => onChangeCourse(text)}
            value={course}
          />

          <TextComponent className="mb-4">{`${
            en ? 'Selected course:' : 'Wybrany kierunek:'
          } ${courseName}`}</TextComponent>

          <LabeledTextInputComponent
            underline
            className="mb-4"
            label={en ? 'Lab group number:' : 'Numer grupy laboratoryjnej:'}
            inputMode="numeric"
            maxLength={2}
            onChangeText={text => onChangeLab(text)}
            value={lab}
          />

          <LabeledTextInputComponent
            underline
            className="mb-4"
            label={
              en ? 'Computer lab group number:' : 'Numer grupy komputerowej:'
            }
            inputMode="numeric"
            maxLength={2}
            onChangeText={text => onChangeComputerLab(text)}
            value={computerLab}
          />

          <LabeledTextInputComponent
            underline
            className="mb-4"
            label={en ? 'Project group number:' : 'Numer grupy projektowej:'}
            inputMode="numeric"
            maxLength={2}
            onChangeText={text => onChangeProject(text)}
            value={project}
          />

          <LabeledTextInputComponent
            underline
            className="mb-2"
            label={en ? 'English group:' : 'Grupa językowa:'}
            inputMode="text"
            maxLength={3}
            onChangeText={text => onChangeEnglish(text)}
            value={english}
          />

          <LabeledComponent
            className="mb-8"
            label={en ? 'Language:' : 'Język:'}>
            <SwitchComponent
              left="PL"
              right="EN"
              value={en}
              onValueChange={() => handleLanguageChange()}
            />
          </LabeledComponent>

          <ButtonComponent
            full
            onPress={() => handleSubmit()}
            text={en ? 'Save' : 'Zapisz'}></ButtonComponent>
        </View>
      )) || <Loader />}
    </Modal>
  );
};

export default SetupScreen;
