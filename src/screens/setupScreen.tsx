import React, {useState, useContext, useEffect} from 'react';
import {View, TouchableHighlight, Alert} from 'react-native';
import {
  TextComponent,
  TextInputComponent,
  SwitchComponent,
  Loader,
} from '../components';
import {
  setInitialValues,
  fetchTimetable,
  fetchCourseName,
} from '../utils/helpers';
import {RefreshContext} from '../utils/context';
import asyncStorage from '../utils/asyncStorage';

const SetupScreen = () => {
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
  const [loaded, setLoaded] = useState<boolean>(false);
  const en = lang === 'en';

  useEffect(() => {
    asyncStorage.getItem('language').then(data => {
      asyncStorage
        .getItem('course')
        .then(
          data =>
            data &&
            (setCourse(data),
            setPreviousCourse(data),
            fetchCourseName(parseInt(data)).then(
              data => (data && setCourseName(data), setLoaded(true)),
            )),
        );
      data && setLanguage(data);
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
        parseInt(lab) > 1 &&
        parseInt(lab) < 9 &&
        parseInt(computerLab) > 1 &&
        parseInt(computerLab) < 9 &&
        parseInt(project) > 1 &&
        parseInt(project) < 9 &&
        english.length >= 2
      ? ((groups = [
          `l${lab}`,
          `k${computerLab}`,
          `p${project}`,
          english,
          'all',
        ]),
        setInitialValues(parseInt(course), groups, lang).then(() =>
          fetchTimetable(
            !(course === previousCourse) || !(toggleClicks % 2 === 0),
          ).then(() => (useRefresh('submit'), useRefresh('lang'))),
        ))
      : (console.log('incorrect values'), showAlert('Incorrect values', ''));
  };

  const onChangeCourse = (text: string) => {
    setCourse(text);
    text
      ? fetchCourseName(parseInt(text))
          .then(data => data && setCourseName(data))
          .catch(err => setCourseName('Not found'))
      : setCourseName('No course');
  };

  const handleLanguageChange = () => {
    setLanguage(en ? 'pl' : 'en');
    setToggleClicks(toggleClicks + 1);
  };

  return (
    (loaded && (
      <View className="flex-1 py-8 px-4 bg-[#121212]">
        <View className="flex-row items-center">
          <TextComponent className="w-3/5">
            {en ? 'Enter your course number:' : 'Wpisz numer planu:'}
          </TextComponent>
          <TextInputComponent
            inputMode="numeric"
            maxLength={2}
            onChangeText={text => onChangeCourse(text)}
            defaultValue={course}
          />
        </View>

        <TextComponent className="mb-4">{`${
          en ? 'Selected course:' : 'Wybrany kierunek:'
        } ${courseName}`}</TextComponent>

        <View className="flex-row items-center mb-4">
          <TextComponent className="w-3/5">
            {en ? 'Lab group number:' : 'Numer grupy laboratoryjnej:'}
          </TextComponent>
          <TextInputComponent
            inputMode="numeric"
            maxLength={2}
            onChangeText={text => onChangeLab(text)}
            value={lab}
          />
        </View>

        <View className="flex-row items-center mb-4">
          <TextComponent className="w-3/5">
            {en ? 'Computer lab group number:' : 'Numer grupy komputerowej:'}
          </TextComponent>
          <TextInputComponent
            inputMode="numeric"
            maxLength={2}
            onChangeText={text => onChangeComputerLab(text)}
            value={computerLab}
          />
        </View>

        <View className="flex-row items-center mb-4">
          <TextComponent className="w-3/5">
            {en ? 'Project group number:' : 'Numer grupy projektowej:'}
          </TextComponent>
          <TextInputComponent
            inputMode="numeric"
            maxLength={2}
            onChangeText={text => onChangeProject(text)}
            value={project}
          />
        </View>

        <View className="flex-row items-center mb-6">
          <TextComponent className="w-3/5">
            {en ? 'English group:' : 'Grupa językowa:'}
          </TextComponent>
          <TextInputComponent
            inputMode="text"
            maxLength={3}
            onChangeText={text => onChangeEnglish(text)}
            value={english}
          />
        </View>

        <View className="flex-row items-center mb-8">
          <TextComponent className="w-3/5">
            {en ? 'Language:' : 'Język:'}
          </TextComponent>
          <SwitchComponent
            left="PL"
            right="EN"
            value={en}
            onValueChange={() => handleLanguageChange()}
          />
        </View>

        <TouchableHighlight
          className="py-4 px-8 items-center rounded-2xl w-1/2 self-center"
          onPress={() => handleSubmit()}>
          <TextComponent>{en ? 'Save' : 'Zapisz'}</TextComponent>
        </TouchableHighlight>
      </View>
    )) || <Loader />
  );
};

export default SetupScreen;
