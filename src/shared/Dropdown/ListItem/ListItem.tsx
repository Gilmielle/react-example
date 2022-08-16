import React from "react";

interface IGenericListItemProps {
  text: string;
  icon?: React.ReactNode;
}

export function ListItem({ text, icon }: IGenericListItemProps) {
  return (
    <>
      {icon}
      <span>{text}</span>
    </>
  )
}