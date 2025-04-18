import './App.css';
import { TodoProvider } from './context/TodoContext';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import Body from './layout/Body/Body';
import LeftPanel from './layout/LeftPanel/LeftPanel';
import JournalList from './components/JournalList/JournalList';
import JournalForm from './components/JournalForm/JournalForm';

function App() {
    return (
        <TodoProvider>
            <LeftPanel>
                <Header />
                <JournalAddButton />
                <JournalList />
            </LeftPanel>
            <Body>
                <JournalForm />
            </Body>
        </TodoProvider>
    );
}

export default App;
