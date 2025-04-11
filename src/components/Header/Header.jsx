import Logo from '../Logo/Logo';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.css';

const logo = '/logo.svg';

const Header = () => {
    return (
        <header className={styles['header']}>
            <Logo image={logo}></Logo>
            <ThemeToggle />
        </header>
    );
};
export default Header;
