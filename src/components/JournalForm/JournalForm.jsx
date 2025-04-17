import { useContext, useState, useRef } from 'react';
import { TodoContext } from '../../context/TodoContext';
import Button from '../Button/Button';
import { INITIAL_STATE } from './JournalFrom.state';
import styles from './JournalForm.module.css';

const JournalForm = () => {
    const { addTodo, activeTodo, removeTodo, getDisplayTodo } =
        useContext(TodoContext);
    // const [formData, setFormData] = useState(INITIAL_STATE);
    const [formData, setFormData] = useState({
        title: '',
        date: new Date().toISOString().slice(0, 10),
        tag: '',
        post: '',
    });

    const titleRef = useRef();
    const dateRef = useRef();
    const postRef = useRef();

    const handleSubmit = e => {
        e.preventDefault();
        console.log('formatData: ', formData);

        addTodo(formData);
        setFormData({ title: '', date: '', tag: '', post: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                ref={titleRef}
                value={formData.title}
                // isValid={isValid.title}
                onChange={e =>
                    setFormData({ ...formData, title: e.target.value })
                }
            />
            <input
                type="date"
                name="date"
                value={formData.date}
                ref={dateRef}
                onChange={e =>
                    setFormData({ ...formData, date: e.target.value })
                }
            />
            <input
                type="text"
                name="tag"
                value={formData.tag}
                onChange={e =>
                    setFormData({ ...formData, tag: e.target.value })
                }
            />
            <textarea
                type="text"
                name="post"
                value={formData.post}
                ref={postRef}
                onChange={e =>
                    setFormData({ ...formData, post: e.target.value })
                }
            ></textarea>

            <Button type="submit">Сохранить</Button>
        </form>
    );
};

export default JournalForm;
