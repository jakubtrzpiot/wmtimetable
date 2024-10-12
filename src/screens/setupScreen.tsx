import React, {useState, useContext, useEffect} from 'react';
import {View, Alert, Modal, Image} from 'react-native';
import {
  IconComponent,
  LabeledComponent,
  LabeledTextInputComponent,
  SwitchComponent,
  Loader,
  ButtonComponent,
  PickerComponent,
} from '../components/core';
import ChangeColorModal from '../components/modals/changeColorModal';
import {
  setInitialValues,
  fetchTimetable,
  fetchCourseName,
  fetchCourses, //TODO
} from '../utils/helpers';
import {LanguageContext, RefreshContext, ThemeContext} from '../utils/context';
import asyncStorage from '../utils/asyncStorage';

const SetupScreen = ({
  isSetup,
  setTimetable,
}: {
  isSetup: boolean;
  setTimetable: any;
}) => {
  //TODO refactor this mess
  const [course, setCourse] = useState<string>('');
  const [previousGroups, setPreviousGroups] = useState<string[]>([]);
  const [previousCourse, setPreviousCourse] = useState<string>('');
  const [lab, onChangeLab] = useState<string>('');
  const [computerLab, onChangeComputerLab] = useState<string>('');
  const [project, onChangeProject] = useState<string>('');
  const [english, onChangeEnglish] = useState<string>('');
  const useRefresh = useContext(RefreshContext);
  const [courseName, setCourseName] = useState<string>('No course');
  const [lang, setLanguage] = useState<string>('en');
  const [loading, setLoading] = useState<boolean>(true);
  const [setupModalOpen, setSetupModalOpen] = useState<boolean>(true);
  const language = useContext(LanguageContext);
  const en = language === 'en';

  const color = useContext(ThemeContext);

  const [compact, setCompact] = useState(false);

  /// Picker
  const [courseOpen, setCourseOpen] = useState(false);
  const [courseItems, setCourseItems] = useState<
    {value: number; label: string}[]
  >([
    //FIXME
    // {label: '13A1', value: '37'},
    // {label: '13A4', value: '38'},
    // {label: '13A6', value: '39'},
    // {label: '13K1', value: '43'},
    // {label: '13K2', value: '44'},
  ]);

  const [colorModalOpen, setColorModalOpen] = useState<boolean>(false);

  useEffect(() => {
    asyncStorage.getItem('compact').then(data => setCompact(data));
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
                  data => (
                    console.log(data.label),
                    data && setCourseName(data.label),
                    setLoading(false)
                  ),
                )),
            ),
          data && setLanguage(data))
        : setLoading(false);
    });

    asyncStorage
      .getItem('groups')
      .then(
        data => (
          setPreviousGroups(data),
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
                onChangeEnglish(group != 'en0' ? group : '');
                break;
            }
          })
        ),
      )
      .catch(err => console.log(err));
    fetchCourses().then(courses => {
      setCourseItems(courses);
      // console.log(courses);
    });
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
    asyncStorage.setItem('compact', compact); //TODO check it
    const rawGroups = [lab, computerLab, project].map((el: string) =>
      el.length === 1 ? '0' + el : el,
    );
    let groups: string[] = [];

    !(course && lab && computerLab && project)
      ? (console.log('not all values set'), showAlert('Błąd', 'Sprawdź dane'))
      : parseInt(course) >= 1 &&
        rawGroups.every(
          group => parseInt(group) >= 1 && parseInt(group) <= 7,
        ) &&
        /^[a-zA-Z]{2}\d?$/.test(english ? english : 'en0')
      ? ((groups = [
          `l${rawGroups[0]}`,
          `k${rawGroups[1]}`,
          `p${rawGroups[2]}`,
          'all',
        ]),
        english
          ? groups.push(
              english,
              english
                .substring(0, english.length - 1)
                .split('')
                .reverse()
                .join('') +
                english.substring(english.length - 1, english.length),
            )
          : groups.push('en0'),
        // console.log(groups),
        setInitialValues(parseInt(course), groups, 'pl', courseName).then(() =>
          fetchTimetable(true).then(
            () => (
              useRefresh('submit'),
              useRefresh('lang'),
              setSetupModalOpen(false),
              setColorModalOpen(false),
              asyncStorage
                .getItem('timetable')
                .then(result => setTimetable(result))
            ),
          ),
        ))
      : (console.log('incorrect values'), showAlert('Błąd', 'Sprawdź dane'));
  };

  const handleBack = () => {
    setSetupModalOpen(false);
    setColorModalOpen(false);
    useRefresh('setup');
  };

  const onChangeCourse = (text: string, invert: boolean = false) => {
    setCourse(text);
    text
      ? fetchCourseName(parseInt(text))
          .then(data => data && setCourseName(data.label))
          .catch(err =>
            setCourseName((invert ? !en : en) ? 'Not found' : 'Nie znaleziono'),
          )
      : setCourseName((invert ? !en : en) ? 'No course' : 'Brak kierunku');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={setupModalOpen}
      onRequestClose={() => !isSetup && handleBack()}>
      {(!loading && (
        <View className="flex-1 justify-start px-4 bg-[#121212]">
          <Image
            source={require('../components/core/appIcon.png')}
            className="h-16 w-[154] self-center my-16"
            style={[{tintColor: color}]}
          />
          <LabeledComponent
            className="mb-7"
            label={en ? 'Select a course:' : 'Wybierz kierunek:'}>
            <PickerComponent
              labeled
              searchable
              maxHeight={260}
              searchPlaceholder="Szukaj..."
              placeholder={courseName ? courseName : en ? 'Course' : 'Kierunek'}
              open={courseOpen}
              value={course}
              items={courseItems}
              setOpen={setCourseOpen}
              setValue={setCourse}
              setItems={setCourseItems}
              onChangeValue={(value: string) => value && onChangeCourse(value)}
            />
          </LabeledComponent>
          <LabeledTextInputComponent
            underline
            className="mb-4"
            label={
              en
                ? 'English group: (you can leave it empty)'
                : 'Grupa językowa: (można zostawić puste)'
            }
            inputMode="text"
            maxLength={3}
            onChangeText={text => onChangeEnglish(text)}
            value={english}
          />
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
          <LabeledComponent className="mb-2" label="Zmień kolor:">
            <IconComponent
              name="palette"
              size={24}
              label={color.toUpperCase()}
              onPress={() => setColorModalOpen(true)}
            />
          </LabeledComponent>
          <ChangeColorModal
            modalOpen={colorModalOpen}
            setModalOpen={setColorModalOpen}
          />

          <LabeledComponent label="Włączyć tryb kompaktowy?">
            <SwitchComponent
              value={compact}
              left="Nie"
              right="Tak"
              onValueChange={() => setCompact(compact => !compact)}
            />
          </LabeledComponent>

          <ButtonComponent
            full
            className="mt-10"
            onPress={() => handleSubmit()}
            text={en ? 'Save' : 'Zapisz'}></ButtonComponent>
        </View>
      )) || <Loader />}
    </Modal>
  );
};

export default SetupScreen;
