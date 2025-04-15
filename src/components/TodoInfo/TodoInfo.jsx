import { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';

const TodoInfo = () => {
    const { todos, activeTodo = {} } = useContext(TodoContext);

    const currentTodo = todos.find(todo => todo.id === activeTodo);
    console.log('currentTodo: ', currentTodo);
    return (
        <>
            <h1>TodoInfo</h1>
            <h2>Active todo - {currentTodo.id}</h2>
            <h2>Title - {currentTodo.title}</h2>

            {/* <div>ActiveTodo === todo.id {activeTodo === to}</div> */}
        </>
    );
};
export default TodoInfo;
