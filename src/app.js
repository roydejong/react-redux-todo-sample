import React from 'react';
import {connect} from 'react-redux';
import {ActionTypes} from './actionTypes.js';

const addTodo = (text) => ({
  type: ActionTypes.AddTodo,
  text
});

const deleteTodo = (id) => ({
  type: ActionTypes.DeleteTodo,
  id
});

const completeTodo = (id) => ({
  type: ActionTypes.CompleteTodo,
  id
});

class Todo extends React.Component {
  render() {
    return (
      <div>
        <input type={"checkbox"} id={this.props.id} checked={this.props.checked}
               onClick={this.props.onComplete}/>
        <label htmlFor={this.props.id}>
          <strong>{this.props.text}&nbsp;</strong>
        </label>
        <button onClick={this.props.onDelete}>Del</button>
        <hr/>
      </div>
    );
  }
}

class App extends React.Component {
  handleKeyPress(e) {
    if (e.key === "Enter") {
      const text = e.target.value;

      if (text) {
        this.props.dispatch(addTodo(text));
        e.target.value = "";
      }
    }
  }

  handleTodoDelete(todo) {
    this.props.dispatch(deleteTodo(todo.id));
  }

  handleTodoCheck(todo) {
    if (!todo.checked) {
      this.props.dispatch(completeTodo(todo.id));
    }
  }

  render() {
    return (
      <div>
        <h1>✔ TodoApp</h1>
        <hr/>
        <input placeholder={"Add new todo"} onKeyPress={(e) => this.handleKeyPress(e)}
               style={{width: "300px", height: "30px"}} autoFocus={true}/>
        <hr/>
        {Object.values(this.props.todos).map((todo, i) => (
          <Todo key={i} {...todo} onDelete={() => this.handleTodoDelete(todo)}
                onComplete={() => this.handleTodoCheck(todo)}
          />
        ))}
      </div>
    );
  };
}

const mapStateToProps = (state) => ({
  todos: state.todos
});

export default connect(mapStateToProps)(App);
