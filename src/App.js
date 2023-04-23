import {auth} from './firebase';
import {useState, useEffect} from 'react';
import Main from './components/Main';
import Nav from './components/Nav';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user => {
        setUser(user);
    });
    return()=>{
      unsubscribe();
    }
  }, []);

  return (
    <div className="App">
        <Nav user={user} />
        <Main user={user} modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default App;
