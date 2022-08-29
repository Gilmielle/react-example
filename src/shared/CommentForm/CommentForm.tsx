import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import styles from './commentForm.css';

interface ICommentFormProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  autofocus?: boolean;
  buttonText?: string;
}

export function CommentForm({ value, onChange, onSubmit, autofocus = false, buttonText = 'Комментировать' }: ICommentFormProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if(ref.current !== null && autofocus) {
      ref.current.focus();
      ref.current.selectionStart = ref.current.value.length;
    }
  }, []);

  return(
    <form className={styles.form} onSubmit={onSubmit}>
      <textarea name="comment" className={styles.input} value={value} onChange={onChange} ref={ref} />
      <button className={styles.button} type="submit">{buttonText}</button>
    </form>
  );
}

// export function CommentForm({ autofocus = false, buttonText = 'Комментировать' }: ICommentFormProps) {
//   const ref = useRef<HTMLTextAreaElement>(null);

//   useEffect(() => {
//     if(ref.current !== null && autofocus) {
//       ref.current.focus();
//       ref.current.selectionStart = ref.current.value.length;
//     }
//   }, []);

//   const [value, setValue] = useState('');
//   const [touched, setTouched] = useState(false);
//   const [valueError, setValueError] = useState('');
  
//   function handleSubmit(event: FormEvent) {
//     event.preventDefault();
//     setTouched(true);

//     setValueError(validateValue())

//     const isFormValid = !validateValue();
//     if (!isFormValid) return;

//     alert('Форма отправлена')
//   }

//   function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
//     setValue(event.target.value);
//   }

//   function validateValue() {
//     if (value.length <= 3) return 'Введите больше 3-х символов';
//     return '';
//   }


//   return(
//     <form className={styles.form} onSubmit={handleSubmit}>
//       <textarea 
//         className={styles.input} 
//         value={value} 
//         onChange={handleChange} 
//         ref={ref} 
//         aria-invalid={valueError ? 'true' : undefined} 
//       />
//       {touched && valueError && (<div>{valueError}</div>)}
//       <button className={styles.button} type="submit">{buttonText}</button>
//     </form>
//   );
// }