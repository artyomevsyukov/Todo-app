import styles from './Button.module.css';

const Button = ({ children, onClick, type = 'button' }) => {
    return (
        <button
            className={`${styles['button']} accent`}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
export default Button;
