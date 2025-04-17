import { createContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import initialData from '../../JSON/initialData.json';
import { formatTodoDate, prepareTodoForDisplay } from '../utils/dateFormatter';
import { v4 as uuidv4 } from 'uuid';

export const TodoContext = createContext(null);

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useLocalStorage('data', initialData);
    const [activeTodo, setActiveTodo] = useState('');
    const totalTodos = todos.length;

    const addTodo = newTodo => {
        console.log('newTodo.date: ', newTodo.date);
        console.log('todos: ', todos);
        setTodos(prev => [
            ...prev,
            {
                ...newTodo,
                // date: new Date(newTodo.date),
                date: new Date(newTodo.date).toISOString(),
                id: uuidv4(),
            },
        ]);
        // console.log(
        //     'setTodos: ',
        //     setTodos(prev => [
        //         ...prev,
        //         {
        //             ...newTodo,
        //             date: new Date(newTodo.date),
        //             id: uuidv4(),
        //         },
        //     ]),
        // );
    };

    const setFormattedTodos = newTodos => {
        setTodos(
            newTodos.map(todo => ({
                ...todo,
                date: new Date(todo.date),
            })),
        );
    };

    const getDisplayTodo = todoId => {
        const todo = todos.find(todo => todo.id === todoId);
        return prepareTodoForDisplay(todo) || null;
    };

    const mapTodos = todos => {
        if (!todos) {
            return [];
        } else {
            return todos.map(todo => ({
                ...todo,
                date: new Date(todo.date),
            }));
        }
    };

    // const mapTodos = todos => {
    //     return todos?.map(todo => ({
    //         ...todo,
    //         date: new Date(todo.date), // Восстанавливаем Date
    //     }));
    // };

    // const getDisplayTodo = todoId => {
    //     const todo = todos.find(todo => todo.id === todoId);
    //     if (!todo) return null;
    //     return {
    //         ...todo,
    //         date: new Date(todo.date), // Восстанавливаем Date
    //     };
    // };

    const removeTodo = id => {
        console.log('remove');
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const value = {
        todos,
        addTodo,
        setTodos: setFormattedTodos,
        totalTodos,
        mapTodos,
        removeTodo,
        activeTodo,
        setActiveTodo,
        formatTodo: prepareTodoForDisplay,
        getDisplayTodo,
    };

    return (
        <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    );
};
