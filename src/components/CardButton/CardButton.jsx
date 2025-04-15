import { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import cn from 'classnames';
import styles from './CardButton.module.css';

const CardButton = ({ children, todo = {}, className, ...props }) => {
    const { activeTodo, setActiveTodo } = useContext(TodoContext);

    const handleClick = () => {
        if (!todo.id) return;
        console.log(todo.id);
        setActiveTodo(todo.id === activeTodo ? null : todo.id);
        console.log('click setActiveTodo: ', activeTodo);
    };

    const cl = cn(
        styles['card-btn'],
        {
            [styles['active']]: todo.id === activeTodo,
        },
        className,
    );

    return (
        <button onClick={handleClick} className={cl} {...props}>
            {children}
        </button>
    );
};
export default CardButton;
