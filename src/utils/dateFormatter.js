export const formatTodoDate = date => {
    console.log('date: ', date);
    console.log(new Intl.DateTimeFormat('ru').format(new Date(date)));

    if (!date) return null;
    return new Intl.DateTimeFormat('ru').format(new Date(date));
};

export const prepareTodoForDisplay = todo => {
    if (!todo) return null;
    return {
        ...todo,
        date: formatTodoDate(todo.date),
        // другие преобразования если нужно
    };
};
