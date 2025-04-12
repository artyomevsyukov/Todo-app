import { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
// import todoData from '../../JSON/data.json';
import initialData from '../../JSON/initialData.json';

export const TodoContext = createContext(null);

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useLocalStorage('data', initialData);
    return (
        <TodoContext.Provider value={{ todos, setTodos }}>
            {children}
        </TodoContext.Provider>
    );
};
