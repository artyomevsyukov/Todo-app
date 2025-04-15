import styles from './JournalForm.module.css'
import Button from '../Button/Button'
import { useContext, useEffect, useReducer, useRef } from 'react'
import CN from 'classnames'
import { INITIAL_STATE, formReducer } from './JournalFrom.state'
import Input from '../Input/Input'
import { UserContext } from '../../context/user.context'

function JournalForm({ submit, data, onDelete }) {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE)
    const { isValid, values, isFormReadyToSubmit } = formState
    const titleRef = useRef()
    const dateRef = useRef()
    const postRef = useRef()
    const { userId } = useContext(UserContext)

    function focusError(isValid) {
        switch (true) {
            case !isValid.title:
                titleRef.current.focus()
                break
            case !isValid.date:
                dateRef.current.focus()
                break
            case !isValid.post:
                postRef.current.focus()
                break
        }
    }

    useEffect(() => {
        if (!data) {
            dispatchForm({ type: 'CLEAR' })
            dispatchForm({ type: 'SET_VALUE', payload: { userId } })
        }
        // if (data) {
        //     dispatchForm({ type: 'SET_VALUE', payload: { ...data } })
        // }
        dispatchForm({ type: 'SET_VALUE', payload: { ...data } })
    }, [data, userId])

    useEffect(() => {
        dispatchForm({ type: 'CLEAR' })
        dispatchForm({ type: 'SET_VALUE', payload: { userId } })
        // data.id = ''
    }, [userId])

    useEffect(() => {
        let timerID
        if (!isValid.date || !isValid.post || !isValid.title) {
            focusError(isValid)
            timerID = setTimeout(() => {
                dispatchForm({ type: 'RESET_VALIDITY' })
            }, 2000)
        }
        return () => {
            clearTimeout(timerID)
        }
    }, [isValid])

    useEffect(() => {
        if (isFormReadyToSubmit) {
            submit(values)
            dispatchForm({ type: 'CLEAR' })
            dispatchForm({ type: 'SET_VALUE', payload: { userId } })
        }
    }, [isFormReadyToSubmit, values, submit, userId])

    useEffect(() => {
        dispatchForm({
            type: 'SET_VALUE',
            payload: { userId },
        })
    }, [userId])

    const onChange = e => {
        dispatchForm({
            type: 'SET_VALUE',
            payload: { [e.target.name]: e.target.value },
        })
    }

    const addJournalItem = e => {
        e.preventDefault()
        dispatchForm({ type: 'SUBMIT' })
        // data.id = ''
    }

    const deleteJournalItem = () => {
        onDelete(data.id)
        dispatchForm({ type: 'CLEAR' })
        dispatchForm({ type: 'SET_VALUE', payload: { userId } })
        data.id = ''
    }

    return (
        <>
            <form className={styles['journal-form']} onSubmit={addJournalItem}>
                {/* {userId} */}
                <div className={styles['form-row']}>
                    <Input
                        appearance="title"
                        type="text"
                        ref={titleRef}
                        onChange={onChange}
                        name="title"
                        value={values.title}
                        isValid={isValid.title}
                        // className={`${styles['input']} ${formValidateState.title ? '' : styles['invalid']}`}
                    />
                    {data?.id && (
                        <button
                            type="button"
                            className={styles['delete']}
                            onClick={deleteJournalItem}
                        >
                            <img src="/archive.svg" alt="Иконка удаления" />
                        </button>
                    )}
                </div>
                <div className={styles['form-row']}>
                    <label htmlFor="date" className={styles['form-label']}>
                        <img src="/calendar.svg" alt="Иконка календаря" />
                        <span>Дата</span>
                    </label>
                    <Input
                        onChange={onChange}
                        id="date"
                        type="date"
                        name="date"
                        value={
                            values.date
                                ? new Date(values.date)
                                      .toISOString()
                                      .slice(0, 10)
                                : ''
                        }
                        ref={dateRef}
                        isValid={isValid.date}
                        // className={`${styles['input']} ${formValidateState.date ? '' : styles['invalid']}`}
                    />
                </div>
                <div className={styles['form-row']}>
                    <label htmlFor="tag" className={styles['form-label']}>
                        <img src="/folder.svg" alt="Иконка папки" />
                        <span>Метки</span>
                    </label>
                    <Input
                        className={styles['input']}
                        type="text"
                        name="tag"
                        id="tag"
                        value={values.tag}
                        onChange={onChange}
                    />
                </div>
                <textarea
                    name="post"
                    id=""
                    cols="30"
                    rows="10"
                    spellCheck="true"
                    value={values.post}
                    onChange={onChange}
                    ref={postRef}
                    // className={`${styles['input']} ${formValidateState.text ? '' : styles['invalid']}`}
                    className={CN(styles['input'], {
                        [styles['invalid']]: !isValid.post,
                    })}
                ></textarea>

                <Button
                    type="submit"
                    // onClick={() => console.log("На нас нажали")}
                >
                    Сохранить
                </Button>
            </form>
        </>
    )
}

export default JournalForm
