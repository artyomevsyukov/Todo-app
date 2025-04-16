export const formatTodoDate = date => {
    if (!date) return null;
    return new Intl.DateTimeFormat('ru-RU').format(new Date(date));
};

export const prepareTodoForDisplay = todo => {
    if (!todo) return null;
    return {
        ...todo,
        date: formatTodoDate(todo.date),
        // другие преобразования если нужно
    };
};
