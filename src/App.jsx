import './App.css';
import { useContext } from 'react';
import { TodoProvider, TodoContext } from './context/TodoContext';
import Button from './components/Button/Button';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import Body from './layout/Body/Body';
import LeftPanel from './layout/LeftPanel/LeftPanel';
import JournalList from './components/JournalList/JournalList';
import TodoInfo from './components/TodoInfo/TodoInfo';

function App() {
    // const { activeTodo } = useContext(TodoContext);

    return (
        <TodoProvider>
            <LeftPanel>
                <Header />
                <JournalAddButton />
                <JournalList />
            </LeftPanel>
            <Body>
                <Button onClick={() => console.log('Отправить')}>
                    Отправить
                </Button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
                {/* {activeTodo ? <TodoInfo /> : null} */}
                <TodoInfo />
            </Body>
        </TodoProvider>
    );
}

export default App;
