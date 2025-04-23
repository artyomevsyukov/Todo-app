import { forwardRef } from 'react';
import CN from 'classnames';
import styles from './Input.module.css';

const Input = forwardRef(function Input(
    { className, isValid = true, appearance, ...props },
    ref,
) {
    return (
        <input
            {...props}
            ref={ref}
            className={CN(styles['input'], className, {
                [styles['invalid']]: !isValid,
                [styles['input-title']]: appearance === 'title',
            })}
        />
    );
});

export default Input;
