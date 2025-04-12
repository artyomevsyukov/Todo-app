import styles from './JournalItem.module.css';

const JournalItem = ({ todo }) => {
    const { title, post, date } = todo;
    const dateObj = new Date(date);
    const formateDate = new Intl.DateTimeFormat('ru-Ru').format(dateObj);

    return (
        <>
            <h2 className={styles['journal-item__title']}>{title}</h2>
            <div className={styles['journal-item__body']}>
                <div className={styles['journal-item__date']}>
                    {formateDate}
                </div>
                <div className={styles['journal-item__post']}>{post}</div>
            </div>
        </>
    );
};
export default JournalItem;
