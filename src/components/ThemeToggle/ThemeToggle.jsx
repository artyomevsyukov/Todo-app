import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
    const [currentTheme, setCurrentTheme] = useState(null);

    // Проверяем сохранённую тему или системные настройки
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersLight = window.matchMedia(
            '(prefers-color-scheme: light)',
        ).matches;

        // Определяем начальную тему
        let initialTheme = 'dark'; // По умолчанию тёмная
        if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
            initialTheme = 'light';
        }

        // Устанавливаем тему в DOM и состояние
        document.documentElement.setAttribute('data-theme', initialTheme);
        setCurrentTheme(initialTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        // Обновляем DOM, localStorage и состояние
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        setCurrentTheme(newTheme);
    };

    // Пока не определили тему, ничего не рендерим (или заглушку)
    if (currentTheme === null) return null;

    return (
        <button className={styles['button']} onClick={toggleTheme}>
            {currentTheme === 'light' ? '🌙' : '☀️'}
        </button>
    );
}
