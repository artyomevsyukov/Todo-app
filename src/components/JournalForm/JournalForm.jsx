import { useContext, useState, useRef, useEffect } from 'react';
import { TodoContext } from '../../context/TodoContext';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './JournalForm.module.css';

const JournalForm = () => {
    const archive = (
        <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            // className={styles['archive-icon']}
            className={styles['delete']}
            // style={{ color: 'black' }}
        >
            {/* <g opacity="0.4"> */}
            <g>
                <rect
                    x="0.5"
                    y="0.5"
                    width="29"
                    height="29"
                    rx="14.5"
                    stroke="currentColor"
                />
                <path
                    d="M21.6667 8.33334H8.33335C7.41288 8.33334 6.66669 9.07954 6.66669 10V10.8333C6.66669 11.7538 7.41288 12.5 8.33335 12.5H21.6667C22.5872 12.5 23.3334 11.7538 23.3334 10.8333V10C23.3334 9.07954 22.5872 8.33334 21.6667 8.33334Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M8.33331 12.5V20C8.33331 20.442 8.50891 20.866 8.82147 21.1785C9.13403 21.4911 9.55795 21.6667 9.99998 21.6667H20C20.442 21.6667 20.8659 21.4911 21.1785 21.1785C21.4911 20.866 21.6666 20.442 21.6666 20V12.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M13.3333 15.8333H16.6666"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
    const { addTodo, activeTodo, removeTodo, getDisplayTodo, setActiveTodo } =
        useContext(TodoContext);
    const currentTodo = getDisplayTodo(activeTodo);

    const DEFAULT_DATE = new Date().toISOString().slice(0, 10);
    const INITIAL_FORM_DATA = {
        title: '',
        date: DEFAULT_DATE,
        tag: '',
        post: '',
    };

    const [formData, setFormData] = useState(INITIAL_FORM_DATA);

    const titleRef = useRef();
    const dateRef = useRef();
    const postRef = useRef();

    const formatDate = dateString => {
        if (!dateString) return DEFAULT_DATE;
        if (dateString.includes('.')) {
            const [day, month, year] = dateString.split('.');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
        return dateString;
    };

    // useEffect(() => {
    //     if (activeTodo) {
    //         setFormData({
    //             ...currentTodo,
    //             date: formatDate(currentTodo.date),
    //         });
    //     }
    // }, [activeTodo]);

    // useEffect(() => {
    //     if (!currentTodo) {
    //         setFormData({
    //             title: '',
    //             date: new Date().toISOString().slice(0, 10), // Формат: YYYY-MM-DD
    //             tag: '',
    //             post: '',
    //         });
    //     }
    // }, [currentTodo]);

    useEffect(() => {
        if (activeTodo && currentTodo) {
            setFormData({
                title: currentTodo.title || '',
                tag: currentTodo.tag || '',
                post: currentTodo.post || '',
                date: formatDate(currentTodo.date) || DEFAULT_DATE,
            });
        } else {
            setFormData(INITIAL_FORM_DATA);
        }
    }, [activeTodo]);

    useEffect(() => {
        if (titleRef.current && !formData.title) {
            titleRef.current.focus();
        }
    }, []);

    const handleSubmit = e => {
        e.preventDefault();

        if (!formData.title.trim()) {
            titleRef.current.focus();
            return;
        }

        addTodo(formData);
        setFormData(INITIAL_FORM_DATA);
        setActiveTodo(null);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className={styles['journal-form']}>
            <div className={styles['form-row']}>
                <Input
                    // autoFocus
                    appearance="title"
                    type="text"
                    name="title"
                    ref={titleRef}
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Название"
                    // required
                />
                {currentTodo?.id && (
                    <button
                        type="button"
                        className={styles['delete']}
                        onClick={() => removeTodo(currentTodo.id)}
                    >
                        {archive}
                    </button>
                )}
            </div>
            <div className={styles['input-lable-block']}>
                <div className={styles['form-row']}>
                    <label htmlFor="date" className={styles['form-label']}>
                        <img src="/calendar.svg" alt="Иконка календаря" />
                        <span>Дата</span>
                    </label>
                    <Input
                        className={styles['input-date']}
                        type="date"
                        name="date"
                        value={formData.date}
                        ref={dateRef}
                        onChange={handleChange}
                        // required
                    />
                </div>
                <div className={styles['form-row']}>
                    <label htmlFor="tag" className={styles['form-label']}>
                        <img src="/folder.svg" alt="Иконка папки" />
                        <span>Метки</span>
                    </label>
                    <Input
                        type="text"
                        name="tag"
                        value={formData.tag}
                        onChange={handleChange}
                        placeholder="Тег"
                    />
                </div>
            </div>
            <textarea
                name="post"
                value={formData.post}
                ref={postRef}
                rows="10"
                className={styles['input-textarea']}
                onChange={handleChange}
                placeholder="Содержание"
                // required
            />
            <div className={styles.buttons}>
                <Button type="submit">Сохранить</Button>
            </div>
        </form>
    );
};

export default JournalForm;
