import mocha from 'mocha';
import chai  from 'chai';
import sinon from 'sinon';

import { createTodo, editTodo, deleteTodo } from './todo-actions';
import todoActionsEnum from '../enums/todo-action-enum';

const expect = chai.expect;

describe('todo-actions', () => {
  var todo;
  var timer;
  beforeEach(() => {
    timer = sinon.useFakeTimers(new Date(2011,9,1).getTime());
  });
  afterEach(() => {
    timer.restore();
  });
  describe('createTodo(text)', () => {
    const todoText = 'Thing To Do';
    beforeEach(() => {
      todo = createTodo(todoText);
    });

    it('should return an object', () => {
      expect(todo).to.be.an('object');
    });

    it('should accept a `text` property', () => {
      expect(todo.text).to.equal(todoText);
    });

    it('should use the current date', () => {
      const date = new Date();

      expect(todo.date).to.eql(date);
    });

    it('should have a type', () => {
      expect(todo.type).to.equal(todoActionsEnum.get('CREATE_TODO'));
    });
  });
  describe('editTodo(id, text)', () => {
    const editTodoText = 'New Todo Name';
    const todoId       = 0;
    beforeEach(() => {
      todo = editTodo(todoId, editTodoText);
    });

    it('should have text', () => {
      expect(todo.text).to.equal(editTodoText);
    });
    it('should have a date', () => {
      expect(todo.date).to.eql(new Date());
    });
    it('should have the correct type', () => {
      expect(todo.type).to.equal(todoActionsEnum.get('EDIT_TODO'));
    });
    it('should have an id', () => {
      expect(todo.id).to.equal(todoId);
    });
  });
  describe('deleteTodo(id)', () => {
    const todoId = 0;
    beforeEach(() => {
      todo = deleteTodo(todoId);
    });

    it('should have an id', function() {
      expect(todo.id).to.equal(todoId);
    });
    it('should have a type', function() {
      expect(todo.type).to.exist;
    });
  });
});
