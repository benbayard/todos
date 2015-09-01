import todoActionsEnum from '../enums/todo-action-enum';

export function createTodo(text) {
  const type = todoActionsEnum.get('CREATE_TODO');
  return {
    text,
    date: new Date(),
    type
  };
};

export function editTodo(id, text) {
  const type = todoActionsEnum.get('EDIT_TODO');
  return {
    id, text, date: new Date(), type
  };
};

export function deleteTodo(id) {
  const type = todoActionsEnum.get('DELETE_TODO');
  return {
    id, type
  }
};
