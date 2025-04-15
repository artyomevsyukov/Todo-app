import { createContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
// import todoData from '../../JSON/data.json';
import initialData from '../../JSON/initialData.json';
import { v4 as uuidv4 } from 'uuid';

export const TodoContext = createContext(null);

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useLocalStorage('data', initialData);
    const [activeTodo, setActiveTodo] = useState('');
    const totalTodos = todos.length;

    // const getActiveTodo = id => {};

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
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const value = {
        todos,
        setTodos,
        totalTodos,
        removeTodo,
        activeTodo,
        setActiveTodo,
    };

    return (
        <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    );
};
