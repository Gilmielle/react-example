import React, { ChangeEvent, FormEvent, useContext, useRef, useState } from "react";
import { commentContext } from "../context/commentContext";
import styles from './commentForm.css';

export function CommentForm() {
  // FOR THE UNCONTROLLED COMPONENT

  // const ref = useRef<HTMLTextAreaElement>(null);
  // function handleSubmit(event: FormEvent) {
  //   event.preventDefault();
  //   console.log(ref.current?.value);
  // }

  const { value, onChange } = useContext(commentContext);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    onChange(event.target.value)
  }
  
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(value)
  }

  return(
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea className={styles.input} value={value} onChange={handleChange} />
      <button className={styles.button} type="submit">Комментировать</button>
    </form>
  );
}