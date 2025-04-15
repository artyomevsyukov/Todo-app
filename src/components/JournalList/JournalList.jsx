// import styles from './JournalList.module.css';
import { TodoContext } from '../../context/TodoContext';
import { useContext } from 'react';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';

const JournalList = () => {
    const { todos } = useContext(TodoContext);

    return (
        <>
            {todos.map(todo => (
                <CardButton key={todo.id} todo={todo}>
                    <JournalItem todo={todo} />
                </CardButton>
            ))}
        </>
    );
};

export default JournalList;
