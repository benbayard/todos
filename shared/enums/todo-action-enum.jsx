import Immutable from 'Immutable'
const CREATE_TODO = 'CREATE_TODO';
const EDIT_TODO   = 'EDIT_TODO';
const DELETE_TODO = 'DELETE_TODO';
const todoActionsEnum = Immutable.Map({
  CREATE_TODO,
  EDIT_TODO,
  DELETE_TODO
});

export default todoActionsEnum;
