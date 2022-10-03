import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import styles from './replyForm.css';

interface IReplyFormProps {
  author: string;
}

export function ReplyForm({ author }: IReplyFormProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if(ref.current !== null) {
      ref.current.focus();
      ref.current.selectionStart = ref.current.value.length;
    }
  }, []);

  // UNCONTROLLED

  // function handleSubmitUncontrolled(event: FormEvent) {
  //   event.preventDefault();
  //   console.log(ref.current?.value)
  // }

  // return(
  //   <form className={styles.form} onSubmit={handleSubmitUncontrolled}>
  //     <textarea className={styles.input} ref={ref} defaultValue={`${author}, `} />
  //     <button className={styles.button} type="submit">Ответить</button>
  //   </form>
  // );

  
  // CONTROLLED

  const [replyText, setReplyText] = useState(`${author}, `);


  function handleChangeControlled(event: ChangeEvent<HTMLTextAreaElement>) {
    setReplyText(event.target.value)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(replyText);
  }

  return(
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea className={styles.input} value={replyText} onChange={handleChangeControlled} ref={ref} />
      <button className={styles.button} type="submit">Ответить</button>
    </form>
  );
}