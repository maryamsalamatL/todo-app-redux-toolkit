import styles from "./TodoList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, toggleTodo } from "../../features/todos/todosSlice";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <div className={styles.mainContainer}>
      <section>
        <ul>
          {todos.map((todo) => (
            <li className={styles.li} key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo({ id: todo.id }))}
              />
              <p>{todo.title}</p>
              <button onClick={() => dispatch(deleteTodo({ id: todo.id }))}>
                delete
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section>important</section>
      <section>completed</section>
    </div>
  );
};

export default TodoList;
