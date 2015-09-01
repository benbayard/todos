import mocha     from 'mocha';
import chai      from 'chai';
import sinon     from 'sinon';
import Immutable from 'immutable';

import todoActionsEnum from '../enums/todo-action-enum';
import todoReducer     from './todo-reducer';

const expect = chai.expect;

describe('todoReducer', () => {
  it(`should return the default state
      if no state is matched`, () => {
    expect(todoReducer()).to.eql(new Immutable.List());
  });
  describe('reducer functions', () => {
    const todoText = 'Text To Do';
    const createAction = {
      type: todoActionsEnum.get('CREATE_TODO'),
      text: todoText,
      date: new Date()
    };
    var todosState;
    beforeEach(() => {
      todosState = todoReducer(undefined, createAction);
    });
    describe('onCreateTodo', () => {
      it('should make a new todo', () => {
        expect(todosState.size).to.equal(1);
      });
    });
    describe('onEditTodo', () => {
      const todoEditText = 'Edited Text';
      const todoId       = '0';
      const editAction   = {
        type: todoActionsEnum.get('EDIT_TODO'),
        text: todoEditText,
        id:   todoId,
        date: new Date()
      }

      it(`should edit the todo
          with a given id`, () => {
        const todosState = todoReducer(undefined, editAction);
        expect(todosState.get(0)).to.equal(todoEditText);
      });
    });
    describe('onDeleteTodo', () => {
      const deleteAction = {
        type: todoActionsEnum.get('DELETE_TODO'),
        id:   0
      }
      beforeEach(() => {
        todosState = todoReducer(todosState, deleteAction);
      });
      it('should delete the todo', () => {
        expect(todosState.size).to.equal(0);
      });
    });
  });
});
