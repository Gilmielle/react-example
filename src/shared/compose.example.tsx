import React from "react";
import { getValue } from "../utils/react/pickFromSyntheticEvent";
import { preventDefault } from "../utils/react/preventDefault";
import { stopPropagation } from "../utils/react/stopPropagation";

function InputExample({ value, onChange }: any) {
  return(
    <input 
      value={value}
      // все 3 записи идентичны
      // onChange={preventDefault(stopPropagation(getValue(onChange)))}
      // onChange={compose(onChange, getValue, stopPropagation, preventDefault)}
      onChange={pipe(preventDefault, stopPropagation, getValue, onChange)}
    />
  )
}

// принимает другие функции и исполняет их по-очереди справа налево
function compose<U>(...fns: Function[]) {
  return <E,>(initialValue: any): U =>
    fns.reduceRight((previousValue, fn) => fn(previousValue), initialValue);
}

// то же самое, только слева направо
function pipe<U>(...fns: Function[]) {
  return <E,>(initialValue: any): U =>
    fns.reduce((previousValue, fn) => fn(previousValue), initialValue);
}

function pick<K extends string>(prop: K) {
  return <O extends Record<K, any>>(obj: O) => obj[prop];
}

const some = pick('value')({ value: 1 }) // -> 1

function isEqual<T>(left: T) {
  return <E extends T>(right: E) => left === right;
}

// инвертирует булево значение
function cond(b: boolean) {
  return !b;
}

const comments = [{ id: 22, text: 'text One' }, { id: 44, text: 'text Two' }]

// const filteredComments = comments.filter(({ id }) => id != 22);
const createFilterBy = (prop: string) => (id: number) => pipe(pick('id'), isEqual(id), cond);
const filterWithId = createFilterBy('id');
const filterWithId22 = createFilterBy('id')(22);
const filterByValue = createFilterBy('value');

// фильтрует по ID 22
const filteredComments = comments.filter(filterWithId(22));
const filteredComments1 = comments.filter(filterWithId22);

// фильтрует по значению 22
const filteredComments2 = comments.filter(filterByValue(22));
