// import { useState } from 'react';

// const useLocalStorage = (key, initialValue = []) => {
//     const localStorageData = () => {
//         try {
//             const storedData = localStorage.getItem(key);
//             return storedData ? JSON.parse(storedData) : initialValue;
//         } catch (error) {
//             console.error('Error reading from localStorage:', error);
//             return initialValue;
//         }
//     };

//     const [data, setData] = useState(localStorageData());

//     const saveData = newData => {
//         try {
//             localStorage.setItem(key, JSON.stringify(newData));
//             setData(newData);
//         } catch (error) {
//             console.error('Error saving to localStorage:', error);
//         }
//     };

//     return [data, saveData];
// };

// export default useLocalStorage;

import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue = []) => {
    useEffect(() => {
        console.log('storedData use: ', data);
    }, []);
    const getLocalStorageData = () => {
        try {
            const storedData = localStorage.getItem(key);
            if (!storedData) return initialValue;
            return JSON.parse(storedData);
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return initialValue;
        }
    };

    const [data, setData] = useState(getLocalStorageData);

    const saveData = newData => {
        try {
            const dataToSave =
                typeof newData === 'function' ? newData(data) : newData;
            localStorage.setItem(key, JSON.stringify(dataToSave));
            setData(dataToSave);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    };

    return [data, saveData];
};

export default useLocalStorage;
