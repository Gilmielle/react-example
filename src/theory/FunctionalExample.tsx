// Карирование
// Идея в том, чтобы вычислять аргументы функции по мере того, как мы её вызываем
// То есть мы откладываем вычисление, а потом собираем аргументы

// Функции высшего порядка - это такая функция, которая возвращает другую функцию
// или принимает другую функцию в качестве аргумента
// Например это window.addEventListener('resize', () => {})

// то же самое, что ниже
// function add(leftSide: number) {
//   return (rightSide: number) => leftSide + rightSide;
// }

const add = (leftSide: number) => (rightSide: number) => leftSide + rightSide;

add(1)(1);
const addOne = add(1);
const addSix = add(6);

addOne(5); // --> 6

/// --- ///
import React from 'react';

// 2. Эта функция принимает другую функцию, то есть Функциональный реакт компонент Block
// и вотзвращает третью функцию, то есть аргумент для map
const withIdKey = withKey('id');

function Feed(props: { blocks: IBlockProps[] }) {
  return(
    <div>
      {/* {props.blocks.map((block) => 
        <Block key={block.id} {...block} />
      )} */}
      {props.blocks.map(withIdKey(Block))}
    </div>
  );
}

interface IBlockProps {
  title: string;
  id: string;
}

function Block(props: IBlockProps) {
  return(
    <div>{props.title}</div>
  )
}

// 1. Эта функция принимает строковый ключ и возвращает функцию, которая принимает React компонент
function withKey(key?: string) {
  return <E extends Record<string, any>, T extends React.ComponentType<E>>(component: T) => 
  // 3. map передаёт в нашу функцию свойства props и индекс
  // Далее мы создаём React элемент
  (props: E, index: number) => 
    React.createElement(
      component,
      { ...props, key: key ? props[key as keyof E] : index },
      [],
    );
}

/// --- ///

function Input(props: { onChange: (value: string) => void, value: string }) {
  return (
    // <input value={props.value} onChange={(e) => props.onChange(e.currentTarget.value)} />
    <input value={props.value} onChange={getValue(props.onChange)} />
  )
}

function Chechbox(props: { onChange: (value: boolean) => void, value: boolean }) {
  return (
    // <input type='checkbox' checked={props.value} onChange={(e) => props.onChange(e.currentTarget.checked)} />
    <input type='checkbox' checked={props.value} onChange={getChecked(props.onChange)} />
  )
}

function pickFromSyntheticEvent<T extends HTMLElement>() {
  return <K extends keyof T>(key: K) => 
  // E расширяет функцию, которая принимает аргумент t, который имеет тип T[K] и возвращает void
    <E extends ((t: T[K]) => void)>(fn: E) => 
      (e: React.SyntheticEvent<T>) => 
        fn(e.currentTarget[key]);
}

// pickFromSyntheticEvent возвращает функции getValue или getChecked
// getValue и getChecked принимают наш колбэк { (e) => props.onChange }, в который они передадут результат
// e.currentTarget[key], где key равно value либо checked
export const getValue = pickFromSyntheticEvent<HTMLInputElement>()('value');
export const getChecked = pickFromSyntheticEvent<HTMLInputElement>()('checked');

/// --- ///

function NotStandardLink(props: any) {
  // const handleClick = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   props.onClick();
  // }

  // return (
  //   <a onClick={handleClick}>Hello</a>
  // )

  return (
    <a onClick={preventDefault(stopPropagation(props.onClick))}>Hello</a>
  )
}

// T - это функция, которая принимает всё, что угодно и возвращает viod
function preventDefault<T extends (e: any) => void>(fn: T) {
  return <E extends React.SyntheticEvent<any>>(e: E) => {
    e.preventDefault();
    fn(e);
  }
}

function stopPropagation<T extends (e: any) => void>(fn: T) {
  return <E extends React.SyntheticEvent<any>>(e: E) => {
    e.stopPropagation();
    fn(e);
  }
}

/// --- ///

interface InputProps {
  onChange: (value: string) => void;
  value: string;
}

function InputNew({ value, onChange }: InputProps) {
  return (
    // объединяем в непрерывную цепочку вызова функций, так как 
    // все нижеуказанные функции принимают функцию и возвращают функцию,
    // которая принимает event
    // Это называется композиция
    <input value={value} onChange={preventDefault(stopPropagation(getValue(onChange)))} />
  )
}