import {auth} from './firebase';
import {useState, useEffect} from 'react';
import Main from './components/Main';
import Nav from './components/Nav';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user=>setUser(user))
    return()=>{
      unsubscribe();
    }
  },[]);

  return (
    <div className="App">
        <Nav user={user} />
        <Main user={user} />
    </div>
  );
}

export default App;
