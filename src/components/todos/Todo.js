import styles from "./Todo.module.css";
import { useDispatch } from "react-redux";
import {
  toggleAsyncCompleted,
  deleteAsyncTodo,
  toggleAsyncImportant,
} from "../../features/todos/todosSlice";
import { RxStarFilled, RxStar } from "react-icons/rx";
import { BiTrash } from "react-icons/bi";

const Todo = ({ id, completed, title, important, sectionID }) => {
  const dispatch = useDispatch();
  return (
    <li
      className={
        sectionID === "new-todo-section"
          ? styles.yellowBorder
          : sectionID === "important-todo-section"
          ? styles.pinkBorder
          : sectionID === "completed-todo-section"
          ? styles.greenBorder
          : ""
      }
    >
      <div className={styles.titleBox}>
        <input
          type="checkbox"
          checked={completed}
          onChange={() =>
            dispatch(toggleAsyncCompleted({ id, completed: !completed }))
          }
        />
        <p>{title}</p>
      </div>
      <div className={styles.btnBox}>
        <button
          className={styles.importantBtn}
          onClick={() =>
            dispatch(toggleAsyncImportant({ id, important: !important }))
          }
        >
          {important ? <RxStarFilled /> : <RxStar />}
        </button>
        <button
          className={styles.removeBtn}
          onClick={() => dispatch(deleteAsyncTodo({ id }))}
        >
          <BiTrash />
        </button>
      </div>
    </li>
  );
};

export default Todo;
