import { assoc } from "../js/assoc";

// библиотека nanoid
export const generateRandomString = () => Math.random().toString(36).substring(2, 15);

// здесь generateRandomString вызывается всего 1 раз, когда мы определяем модуль
export const assignId = assoc('id', generateRandomString());

// здесь generateRandomString вызывается каждый раз, когда мы вызываем функцию generateId
export const generateId = <O extends object>(obj: O) => assoc('id', generateRandomString())(obj);
// export const generateId = <O extends object>(obj: O) => assignId(obj);
