import styles from './JournalItem.module.css';
import { TodoContext } from '../context/TodoContext';

const JournalItem = ({ todo }) => {
    const { title, post, date } = todo;
    // const formatDate =

    return (
        <>
            <h2 className={styles['journal-item__title']}>{title}</h2>
            <div className={styles['journal-item__body']}>
                <div className={styles['journal-item__date']}>{date}</div>
                <div className={styles['journal-item__post']}>{post}</div>
            </div>
        </>
    );
};
export default JournalItem;
