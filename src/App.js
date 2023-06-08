import "./App.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import TodoList from "./components/todos/TodoList";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header>
          <div className="title">
            <h2>TO DO APP</h2>
            <span>{new Date().toLocaleDateString("en-US")}</span>
          </div>
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
