import { Provider } from "react-redux";
import "./App.css";
import { store } from "./app/store";
import AddTodoForm from "./components/todos/AddTodoForm";
import TodoList from "./components/todos/TodoList";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header>
          <h2>TO DO APP</h2>
          <div className="nav">
            <a href="#new-todo-section">Todos</a>
            <a href="#important-todo-section">Important</a>
            <a href="#completed-todo-section">Completed</a>
          </div>
        </header>

        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
