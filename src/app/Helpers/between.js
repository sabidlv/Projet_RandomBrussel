
export const objBetween = function minMax(x, y) {
  let min = 0;
  let max = 0;
  if (x <= y) {
    min = x;
    max = y;
  } else {
    min = y;
    max = x;
  }
  return { mini: min, maxi: max };
};
