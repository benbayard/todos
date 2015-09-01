import React                  from 'react';
import TodosView              from 'components/todos-view';
import TodosForm              from 'components/todos-form';
import { bindActionCreators } from 'redux';
import * as TodoActions       from '../actions/todo-actions';
import { connect }            from 'react-redux';
@connect(state => ({ todos: state.todos }))
export default class Home extends React.Component {
  render() {
    const { todos, dispatch } = this.props;

    return (
      <div id="todo-list">
        <TodosView todos={todos}
          {...bindActionCreators(TodoActions, dispatch)} />
        <TodosForm
          {...bindActionCreators(TodoActions, dispatch)} />
      </div>
    );
  }
}
