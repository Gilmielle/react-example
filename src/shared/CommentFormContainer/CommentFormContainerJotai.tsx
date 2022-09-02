import React, { ChangeEvent, FormEvent } from "react";
import { CommentForm } from "../CommentForm";
import { atom, useAtom } from 'jotai'

// realization with Jotai

const textAtom = atom('Привет из jotai');

export function CommentFormContainerJotai() {
  const [value, setValue] = useAtom(textAtom);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value);
  }
  
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(value)
  }
  
  return(
    <CommentForm 
      value={value}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}