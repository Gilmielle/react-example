import React, { ChangeEvent, FormEvent } from "react";
import { CommentForm } from "../CommentForm";
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';

class Comment {
  value = 'Привет из MobX';

  constructor() {
    makeAutoObservable(this)
  }

  updateValue(newValue: string) {
    this.value = newValue;
  }
}

const myComment = new Comment();
// realization with MobX
export const CommentFormContainerMobX = observer(() => {
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    myComment.updateValue(event.target.value);
  }
  
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(myComment.value)
  }
  
  return(
    <CommentForm 
      value={myComment.value}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
})