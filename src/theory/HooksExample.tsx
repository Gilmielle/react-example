// Какие бывают хуки

// 1. useState
// 2. useEffect
// 3. useRef
// 4. useReducer
// 5. useMemo
// 6. useContext
// 7. useCallback
// 8. useImperativeHandle
// 9. useLayoutEffect
// 10. useDebugValue

// Хуки — это функции, с помощью которых вы можете «подцепиться» 
// к состоянию и методам жизненного цикла React из функциональных компонентов

import React from 'react';

export function MyHooks({ title }: { title: string }) {
  // принимает колбэк и зависимости
  // вызывается при каждом рендере
  // при исполнении соблюдается тот порядок, в котором мы указали наши методы
  // Нельзя:
  // Хуки вызываются только из функционального компонента. При вызове из класс компонента выйдет ошибка
  // Нельзя менять порядок исполнения хуков и оборачивать их в if
  // Нельзя использовать хуки внутри хуков

  React.useEffect(() => {
    // без второго аргумента компонент превратится в componentDidMount и componentWillUpdate
    // так как будет запускаться при каждом рендере
    console.log('componentDidMount');
    console.log('componentWillUpdate');
  });

  React.useEffect(() => {
    // с пустым вторым аргументом компонент превратится только в componentDidMount, так как будет видеть там undefined
    // то есть только при первом рендере компонента
    console.log('componentDidMount');
    // так же мы можем вернуть функцию, она отработает перед componentWillUnmount
    return () => {
      console.log('componentWillUnmount');
    }
  }, []);

  React.useEffect(() => {
    // теперь useEffect срабатывает каждый раз, когда мы изменяем свойство title
    // в том числе при первом рендере, так как title сменится с никакого на то значение, что мы передадим
    console.log('componentWillReceiveProps ', title);
  }, [title]);

  const [isMounted] = useIsMounted();
  React.useEffect(() => {
    console.log('isMounted', isMounted)
  }, [isMounted])

  return (
    <div>{title}</div>
  )
}

// возвращает true, когда компонент оказался примонтирован
function useIsMounted() {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // массив тут необязателен, но так пишет хуки реакт
  return [isMounted];
}

/// --- ///

function calculate(items: number, multiplier: number) {
  return new Array(items).fill(1).reduce((a, v) => a * multiplier)
}

export function MyMemoHooks({ title }: { title: string }) {
  const items = 10;
  const multiplier = 5;

  // useMemo позволяет запоминать значение, полученные при помощи сложных вычислений
  // чтобы избежать пересчёта этих значений каждый раз при рендере
  const result = React.useMemo(
    () => calculate(items, multiplier),
    [items, multiplier]
  )

  return (
    <div>{title} {result}</div>
  )
}
