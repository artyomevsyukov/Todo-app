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
