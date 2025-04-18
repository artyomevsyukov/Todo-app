import { useContext, useState, useRef, useEffect } from 'react';
import { TodoContext } from '../../context/TodoContext';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';

const JournalForm = () => {
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
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="text"
                name="title"
                ref={titleRef}
                value={formData.title}
                onChange={handleChange}
                placeholder="Название"
                required
            />
            <input
                type="date"
                name="date"
                value={formData.date}
                ref={dateRef}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                placeholder="Тег"
            />
            <textarea
                name="post"
                value={formData.post}
                ref={postRef}
                onChange={handleChange}
                placeholder="Содержание"
                required
            />
            <div className={styles.buttons}>
                <Button type="submit">Сохранить</Button>
                {currentTodo?.id && (
                    <Button
                        type="button"
                        onClick={() => removeTodo(currentTodo.id)}
                    >
                        Удалить
                    </Button>
                )}
            </div>
        </form>
    );
};

export default JournalForm;
