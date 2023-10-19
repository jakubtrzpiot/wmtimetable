import asyncStorage from './asyncStorage';

export const useInitialValues = async () => {
  try {
    const course = await asyncStorage.getItem('course');
    const groups = await asyncStorage.getItem('groups');
    const language = await asyncStorage.getItem('language');
    const courseName = await asyncStorage.getItem('courseName');

    return course && groups && language && courseName;
  } catch (err) {
    console.error(err, 'in useInitialValues');
    return false;
  }
};
