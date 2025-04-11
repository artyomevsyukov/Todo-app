import './App.css';
import { TodoProvider } from './context/TodoContext';
import Button from './components/Button/Button';
import CardButton from './components/CardButton/CardButton';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import Body from './layout/Body/Body';
import LeftPanel from './layout/LeftPanel/LeftPanel';
import JournalList from './JournalList/JournalList';

function App() {
    return (
        <TodoProvider>
            <LeftPanel>
                <Header />
                <JournalAddButton />
                <JournalList />
                <CardButton>Text</CardButton>
            </LeftPanel>
            <Body>
                <Button onClick={() => console.log('Отправить')}>
                    Отправить
                </Button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </Body>
        </TodoProvider>
    );
}

export default App;
