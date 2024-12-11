export const createTodo = (todo) => {
  return {
    id: `todo-${+new Date()}`,
    todo,
    isChecked: false,
    createdAt: new Date().toISOString(),
    updatedAt: null,
  };
};
