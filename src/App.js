import { Provider } from "react-redux";
import "./App.css";
import { store } from "./app/store";
import AddTodoForm from "./components/todos/AddTodoForm";
import TodoList from "./components/todos/TodoList";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AddTodoForm />
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
