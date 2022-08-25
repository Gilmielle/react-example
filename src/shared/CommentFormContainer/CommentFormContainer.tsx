import React, { ChangeEvent, FormEvent, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, updateComment } from "../../store";
import { CommentForm } from "../CommentForm";

export function CommentFormContainer() {
  // то же самое, что ниже
  // const store = useStore<RootState>();
  // const value = store.getState().commentText;

  const value = useSelector<RootState, string>(state => state.commentText);
  const dispatch = useDispatch();

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    dispatch(updateComment(event.target.value))
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