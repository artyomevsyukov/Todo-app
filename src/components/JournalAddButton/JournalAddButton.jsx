import CardButton from '../CardButton/CardButton';
import styles from './JournalAddButton.module.css';

const JournalAddButton = () => {
    return (
        <CardButton
            onClick={() => console.log('Add')}
            className={styles['journal__add-btn']}
        >
            <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10 4.96265V16.6293"
                    // stroke="var(--color-text)"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M4.16669 10.796H15.8334"
                    // stroke="var(--color-text)"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>{' '}
            Новое воспоминание
        </CardButton>
    );
};
export default JournalAddButton;
