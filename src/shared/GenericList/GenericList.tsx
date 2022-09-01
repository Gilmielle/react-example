import React from "react";
// import { list } from "redom";

interface IItem {
  value: string;
  id: string;
  // 2 вариант
  onClick: (id: string) => void;
}

interface IMyListProps {
  list: IItem[];
  // 1 вариант
  // onClick: (id: string) => void;
}

// 1 вариант
// export function MyList({ list, onClick }: IMyListProps) {
  // 2 вариант
export function MyList({ list }: IMyListProps) {
  
  return (
    <ul>
      {list.map((item) => (
        // 1 вариант
        // <li onClick={() => onClick(item.id)} key={item.id}>{item.value}</li>
          // 2 вариант
          // каждому элементу списка соответствует свой onClick и нет смысла передавать id
        <li onClick={() => item.onClick(item.id)} key={item.id}>{item.value}</li>
      ))}
    </ul>
  )
}

interface IGenericListProps {
  list: IGenericItem[];
}

interface IGenericItem {
  text: string | React.ReactNode;
  id: string;
  onClick?: (id: string) => void;
  className?: string;
  As?: 'a' | 'li' | 'button' | 'div';
  href?: string;
}

const noop = () => {};

// список, который может рендерить любые списки
export function GenericList({ list }: IGenericListProps) {
  return (
    <>
      {list.map(({ As = 'div', text, onClick = noop, className, id, href }) => (
        <As
          className={className}
          onClick={() => onClick(id)}
          key={id}
          href={href}
        >
          {text}
        </As>
      ))}
    </>
  )
}