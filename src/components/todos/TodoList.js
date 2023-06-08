import styles from "./TodoList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getAsyncTodos } from "../../features/todos/todosSlice";
import { useEffect, useState } from "react";
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
      <RenderTodos title="New Todos" todos={newTodos} id="new-todo-section" />
      {todos.length ? (
        <>
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
        </>
      ) : (
        ""
      )}
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
            {isShow ? (
              <BiChevronUp className={styles.showBtn} />
            ) : (
              <BiPlus className={styles.showBtn} />
            )}
          </button>
        )}
      </div>
      {isShow && <AddTodoForm setIsShow={setIsShow} />}

      <ul>
        {todos.length === 0 ? (
          <p style={{ marginTop: "20px" }}>
            there is no {title.split(" ")[0].toLowerCase()} todos
          </p>
        ) : (
          todos.map((todo) => <Todo key={todo.id} {...todo} sectionID={id} />)
        )}
      </ul>
    </section>
  );
};
