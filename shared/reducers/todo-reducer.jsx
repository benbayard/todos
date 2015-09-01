import Immutable from 'immutable';

import todoActionEnum from '../enums/todo-action-enum';

const defaultState = new Immutable.List();

export default function todoReducer(state = defaultState, action = {}) {
  switch (action.type) {
    // CREATE_TODO
    case todoActionEnum.get('CREATE_TODO'):
      return state.concat(action.text);
    // EDIT_TODO
    case todoActionEnum.get('EDIT_TODO'):
      return state.set(action.id, action.text);
    case todoActionEnum.get('DELETE_TODO'):
      return state.delete(action.id);
    default:
      return state;
  }
}
