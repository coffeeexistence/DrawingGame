// @flow

const repeatPromiseSequential = async (
  promiseFn: number => Promise<*>,
  repeatTimes: number,
) => {
  const array = new Array(repeatTimes).fill(0);
  let itemNumber = 0;
  await array.reduce(
    previous =>
      previous.then(() => {
        itemNumber += 1;
        return promiseFn(itemNumber);
      }),
    Promise.resolve(),
  );
};

export default repeatPromiseSequential;
