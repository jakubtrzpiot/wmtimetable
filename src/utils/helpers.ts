export const transpose = (array: Array<any>) => {
  return array[0].map((col: any, i: number) => {
    return array.map(row => {
      return row[i];
    });
  });
};
