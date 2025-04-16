import { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import archive from '/archive.svg';
import styles from './TodoInfo.module.css';

const TodoInfo = () => {
    const { todos, activeTodo, removeTodo } = useContext(TodoContext);

    const currentTodo = todos.find(todo => todo.id === activeTodo) || null;

    if (!currentTodo) {
        return (
            <div className="todo-info-empty">Select a todo to view details</div>
        );
    }

    //Перевод даты в объект Date и в строку для JSX
    const newTodo = {
        ...currentTodo,
        date: new Intl.DateTimeFormat('ru-RU').format(
            new Date(currentTodo.date),
        ),
    };

    const { id, title, text, date } = newTodo;

    return (
        <section className="todo-info">
            <header className="todo-info-header">
                <h2 className="todo-info-title">{title}</h2>
                <span className="todo-info-id">ID: {id}</span>
            </header>

            <div className="todo-info-content">
                {date && <p className="todo-info-date">{date}</p>}
                {text && <p className="todo-info-text">{text}</p>}
            </div>
            <button className={styles['button']} onClick={() => removeTodo(id)}>
                <img className={styles['img']} src={archive} alt="archive" />
            </button>
        </section>
    );
};
export default TodoInfo;
