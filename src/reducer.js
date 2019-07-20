// src/reducer.js

import produce from "immer";
import {ActionTypes} from "./actionTypes";

const initialState = {
  todos: {}
};

// createReducer as suggested in "reducing boilerplate"
function createReducer(handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      // let's integrate immer at this level for ease!
      let test = produce(state, draft => {
        const handler = handlers[action.type];
        return handler(draft, action)
      });
      console.log(initialState, test);
      return test;
    } else {
      return state
    }
  }
}

// In the real world, your server would probably assign the ID
// For the sake of this example, we'll auto-increment a counter
let idMaker = 0;

export const todoReducer = createReducer({
  [ActionTypes.AddTodo]: (state, action) => {
    const text = action.text.trim();
    const nextId = idMaker++;

    state.todos[nextId] = {
      id: nextId,
      text: text,
      checked: false
    };
  },

  [ActionTypes.CompleteTodo]: (state, action) => {
    state.todos[action.id].checked = true;
  },

  [ActionTypes.DeleteTodo]: (state, action) => {
    delete state.todos[action.id];
  }
});