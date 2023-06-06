import styles from "./AddTodoForm.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../features/todos/todosSlice";

const AddTodoForm = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addTodo({ title: inputValue }));
  };
  return (
    <div className={styles.mainContainer}>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default AddTodoForm;
