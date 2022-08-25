import React, { ChangeEvent, FormEvent, useEffect, useRef } from "react";
import styles from './commentForm.css';

interface ICommentFormProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (event: FormEvent) => void;
  autofocus?: boolean;
}

export function CommentForm({ value, onChange, onSubmit, autofocus = false }: ICommentFormProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if(ref.current !== null && autofocus) {
      ref.current.focus();
      ref.current.selectionStart = ref.current.value.length;
    }
  }, []);

  return(
    <form className={styles.form} onSubmit={onSubmit}>
      <textarea className={styles.input} value={value} onChange={onChange} ref={ref} />
      <button className={styles.button} type="submit">Комментировать</button>
    </form>
  );
}