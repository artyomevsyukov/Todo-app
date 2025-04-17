import { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import archive from '/archive.svg';
import styles from './TodoInfo.module.css';

const TodoInfo = () => {
    const { activeTodo, removeTodo, getDisplayTodo } = useContext(TodoContext);

    const currentTodo = getDisplayTodo(activeTodo);

    if (!currentTodo) {
        return <div className="todo-info-empty">Выберите запись</div>;
    }

    const { id, title, text, date } = currentTodo;

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
