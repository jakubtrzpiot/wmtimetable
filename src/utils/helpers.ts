export const transpose = (array: Array<any>) => {
  return array[0].map((row: any, i: number) => {
    return array.map(col => {
      return col[i];
    });
  });
};
