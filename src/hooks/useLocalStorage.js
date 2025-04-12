// import { useState, useEffect } from 'react';

// const useLocalStorage = key => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const res = JSON.parse(localStorage.getItem(key));
//         if (res) {
//             setData(res);
//         }
//     }, []);

//     const seveData = newData => {
//         localStorage.setItem(key, JSON.stringify(newData));
//         setData(newData);
//     };

//     return [data, seveData];
// };
// export default useLocalStorage;
//===========================================================
// import { useState } from 'react';

// const useLocalStorage = (key, initialValue = []) => {
//     // Инициализация состояния с ленивой загрузкой из localStorage
//     const [data, setData] = useState(() => {
//         try {
//             const storedData = localStorage.getItem(key);
//             // Если данные есть - парсим их, иначе используем initialValue
//             return storedData ? JSON.parse(storedData) : initialValue;
//         } catch (error) {
//             // В случае ошибки (например, невалидный JSON) возвращаем initialValue
//             console.error('Error reading from localStorage:', error);
//             return initialValue;
//         }
//     });

//     // Функция для сохранения данных
//     const saveData = newData => {
//         try {
//             // Сохраняем в localStorage
//             localStorage.setItem(key, JSON.stringify(newData));
//             // Обновляем состояние
//             setData(newData);
//         } catch (error) {
//             console.error('Error saving to localStorage:', error);
//         }
//     };

//     return [data, saveData];
// };

// export default useLocalStorage;

//==============================================

import { useState } from 'react';

const useLocalStorage = (key, initialValue = []) => {
    const localStorageData = () => {
        try {
            const storedData = localStorage.getItem(key);
            return storedData ? JSON.parse(storedData) : initialValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return initialValue;
        }
    };

    const [data, setData] = useState(localStorageData);

    const saveData = newData => {
        try {
            localStorage.setItem(key, JSON.stringify(newData));
            setData(newData);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    };

    return [data, saveData];
};

export default useLocalStorage;
