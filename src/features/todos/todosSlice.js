import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, title: "todo1", completed: false },
  { id: 2, title: "todo2", completed: false },
  { id: 3, title: "todo3", completed: false },
  { id: 4, title: "todo4", completed: false },
];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.push(newTodo);
    },
    deleteTodo: (state, action) => {
      //didn't work for me!
      // const filteredTodos = state.filter(
      //   (item) => item.id !== action.payload.id
      // );
      // state = filteredTodos;

      const index = state.findIndex(
        (item) => item.id === Number(action.payload.id)
      );
      state.splice(index, 1);
    },
    toggleTodo: (state, action) => {
      const item = state.find((item) => item.id === Number(action.payload.id));
      item.completed = !item.completed;
    },
  },
});
export const { addTodo, deleteTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
