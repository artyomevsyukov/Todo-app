import cn from 'classnames';
import styles from './CardButton.module.css';

const CardButton = ({ children, className, ...props }) => {
    const cl = cn(styles['card-btn'], className);

    return (
        <button className={cl} {...props}>
            {children}
        </button>
    );
};
export default CardButton;
