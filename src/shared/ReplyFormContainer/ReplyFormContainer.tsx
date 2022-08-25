import React, { ChangeEvent, FormEvent, useState } from "react";
import { CommentForm } from "../CommentForm";

interface IReplyFormProps {
  author: string;
}

export function ReplyFormContainer({ author }: IReplyFormProps) {
  const [replyText, setReplyText] = useState(`${author}, `);

  function handleChangeControlled(event: ChangeEvent<HTMLTextAreaElement>) {
    setReplyText(event.target.value)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(replyText);
  }

  return(
    <CommentForm 
      value={replyText}
      onChange={handleChangeControlled}
      onSubmit={handleSubmit}
      autofocus={true}
    />
  );
}