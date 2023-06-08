import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAsyncTodos = createAsyncThunk(
  "todos/getAsyncTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3001/todos");
      return response.data;
    } catch (error) {
      //2 entry=> 1:payload , 2:meta
      // return rejectWithValue([], error);
      //or
      return rejectWithValue(error);
    }
  }
);
export const addAsyncTodo = createAsyncThunk(
  "todos/addAsyncTodo",
  async ({ title }, { rejectWithValue }) => {
    try {
      const newTodo = {
        id: Date.now(),
        title,
        completed: false,
        important: false,
      };
      const response = await axios.post("http://localhost:3001/todos", newTodo);
      return response.data;
    } catch (error) {
      return rejectWithValue([], error);
    }
  }
);
export const deleteAsyncTodo = createAsyncThunk(
  "todos/deleteAsyncTodo",
  async ({ id }, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue([], error);
    }
  }
);
export const toggleAsyncCompleted = createAsyncThunk(
  "todos/toggleAsyncCompleted",
  async ({ id, completed }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`http://localhost:3001/todos/${id}`, {
        completed,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue([], error);
    }
  }
);
export const toggleAsyncImportant = createAsyncThunk(
  "todos/toggleAsyncImportant",
  async ({ id, important }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`http://localhost:3001/todos/${id}`, {
        important,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    //reducer is for sync actions, we do not use in this case anymore
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.todos.push(newTodo);
    },
    deleteTodo: (state, action) => {
      //didn't work for me!
      // const filteredTodos = state.todos.filter(
      //   (item) => item.id !== action.payload.id
      // );
      // state.todos = filteredTodos;

      const index = state.todos.findIndex(
        (item) => item.id === Number(action.payload.id)
      );
      state.todos.splice(index, 1);
    },
    toggleTodo: (state, action) => {
      const item = state.todos.find(
        (item) => item.id === Number(action.payload.id)
      );
      item.completed = !item.completed;
    },
  },
  //for async actions
  extraReducers: {
    [getAsyncTodos.pending]: (state, action) => {
      return { ...state, todos: [], loading: true, error: null };
    },
    [getAsyncTodos.fulfilled]: (state, action) => {
      return { ...state, todos: action.payload, loading: false, error: null };
    },
    [getAsyncTodos.rejected]: (state, action) => {
      return {
        ...state,
        todos: [],
        loading: false,
        error: action.payload.message,
      };
    },
    [addAsyncTodo.fulfilled]: (state, action) => {
      state.todos.push(action.payload);
    },
    [deleteAsyncTodo.fulfilled]: (state, action) => {
      const filteredTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return { ...state, todos: filteredTodos };
    },
    [toggleAsyncCompleted.fulfilled]: (state, action) => {
      const item = state.todos.find(
        (item) => item.id === Number(action.payload.id)
      );
      item.completed = action.payload.completed;
    },
    [toggleAsyncImportant.fulfilled]: (state, action) => {
      const item = state.todos.find(
        (item) => item.id === Number(action.payload.id)
      );
      item.important = action.payload.important;
    },
  },
});
export const { addTodo, deleteTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
