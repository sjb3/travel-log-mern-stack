import React from "react";
import { useForm } from "react-hook-form";
import styles from "./LogEntryForm.module.css";

const LogEntryForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.entryForm}>
      <div>
        <label htmlFor="title">Title</label>
        <input name="title" required ref={register} />
      </div>
      <div>
        <label htmlFor="comments">Comments</label>
        <textarea name="comments" rows={2} ref={register}></textarea>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea name="description" rows={2} ref={register}></textarea>
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input name="image" ref={register} />
      </div>
      <div>
        <label htmlFor="visitDate">Visit Date</label>
        <input name="visitDate" type="date" required ref={register} />
      </div>
      <button>+</button>
    </form>
  );
};

export default LogEntryForm;
