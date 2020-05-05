import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./LogEntryForm.module.css";
import { createLogEntry } from "../api";

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      await createLogEntry(data);
      // console.log(created);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.entryForm}>
      {error ? <h3 className={styles.error}>{error}</h3> : null}
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
      <button disabled={loading}>{loading ? "Loading..." : "+"}</button>
    </form>
  );
};

export default LogEntryForm;
