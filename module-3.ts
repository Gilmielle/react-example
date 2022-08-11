// TASK 1

function concat(str1: string, str2: string): string {
  return str1 + str2;
}

const res1 = concat('Hello ', 'World');
console.log(res1);

// TASK 2

const MyHometask: IMyHometask = {
  howIDoIt: "I Do It Wel",
  simeArray: ["string one", "string two", 42],
  withData: [{ howIDoIt: "I Do It Wel", simeArray: ["string one", 23] }],
}

interface IMyHometask {
  howIDoIt: string,
  simeArray: Array<any>,
  withData: IWithData[],
}

interface IWithData {
  howIDoIt: string,
  simeArray: Array<any>,
}

// TASK 3

interface MyArray<T> {
  [N: number]: T;

  reduce(fn: (previousValue: T, currentValue: T) => T, initialValue: T): T;
}
const arr: MyArray<number> = [1, 2, 3];
const reducedArr = arr.reduce((accumulator, value) => accumulator + value, 10);
console.log(reducedArr);

// TASK 4

interface IHomeTask {
  data: string;
  numbericData: number;
  date: Date;
  externalData: {
    basis: number;
    value: string;
  }
}

type MyPartial<T> = {
  [N in keyof T]?: T[N] extends object ? MyPartial<T[N]> : T[N]
}

const homeTask: MyPartial<IHomeTask> = {
  externalData: {
    value: 'win',
  }
}
