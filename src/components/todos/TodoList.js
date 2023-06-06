import styles from "./TodoList.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTodo,
  toggleTodo,
  getAsyncTodos,
} from "../../features/todos/todosSlice";
import { useEffect } from "react";

const TodoList = () => {
  const { todos, error, loading } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAsyncTodos());
  }, []);
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{error}</p>;
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
