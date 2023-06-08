import styles from "./TodoList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getAsyncTodos } from "../../features/todos/todosSlice";
import { useEffect, useState, useRef } from "react";
import Todo from "./Todo";
import { BiChevronUp, BiPlus } from "react-icons/bi";
import AddTodoForm from "./AddTodoForm";

const TodoList = () => {
  const { todos, error, loading } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAsyncTodos());
  }, []);
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{error}</p>;

  const newTodos = todos.filter((t) => !t.completed);
  const importantTodos = todos.filter((t) => t.important);
  const completedTodos = todos.filter((t) => t.completed);

  return (
    <div className={styles.mainContainer}>
      <RenderTodos title="Todos" todos={newTodos} id="new-todo-section" />
      <RenderTodos
        title="Important Todos"
        todos={importantTodos}
        id="important-todo-section"
      />
      <RenderTodos
        title="Completed Todos"
        todos={completedTodos}
        id="completed-todo-section"
      />
    </div>
  );
};

export default TodoList;

const RenderTodos = ({ title, todos, id }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <section id={id}>
      <div className={styles.topSection}>
        <h3>{title}</h3>
        {id === "new-todo-section" && (
          <button onClick={() => setIsShow(!isShow)}>
            {isShow ? <BiChevronUp /> : <BiPlus />}
          </button>
        )}
      </div>
      {isShow && <AddTodoForm />}
      <ul>
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} sectionID={id} />
        ))}
      </ul>
    </section>
  );
};
