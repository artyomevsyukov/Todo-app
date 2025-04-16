import { createContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
// import todoData from '../../JSON/data.json';
import initialData from '../../JSON/initialData.json';
import { v4 as uuidv4 } from 'uuid';
import { formatTodoDate, prepareTodoForDisplay } from '../utils/dateFormatter';

export const TodoContext = createContext(null);

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useLocalStorage('data', initialData);
    const [activeTodo, setActiveTodo] = useState('');
    const totalTodos = todos.length;

    const setFormattedTodos = newTodos => {
        setTodos(
            newTodos.map(todo => ({
                ...todo,
                date: new Date(todo.date), // сохраняем как Date объект
            })),
        );
    };

    const getDisplayTodo = todoId => {
        const todo = todos.find(todo => todo.id === todoId);
        return prepareTodoForDisplay(todo) || null;
    };

    const mapTodos = todos => {
        if (!todos) {
            return;
        } else {
            return todos.map(todo => ({
                ...todo,
                date: new Date(todo.date),
            }));
        }
    };

    //     const addTodo = (todo)=> {
    //         if(!todo.id)
    // setTodos([])
    //     }

    const removeTodo = id => {
        console.log('remove');
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const value = {
        todos,
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
