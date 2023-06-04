import { Provider } from "react-redux";
import "./App.css";
import { store } from "./app/store";

import Counter from "./features/counter/Counter";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Counter />
      </div>
    </Provider>
  );
}

export default App;
