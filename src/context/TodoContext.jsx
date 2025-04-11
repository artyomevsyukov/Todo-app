import { createContext, useState } from 'react';
import todoData from '../../JSON/data.json';

export const TodoContext = createContext(null);

export const TodoProvider = ({ children }) => {
    const [todo, setTodo] = useState(todoData);

    return (
        <TodoContext.Provider value={{ todo, setTodo }}>
            {children}
        </TodoContext.Provider>
    );
};
