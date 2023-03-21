import {auth} from './firebase';
import {useState, useEffect} from 'react';
import Main from './components/Main';
import Nav from './components/Nav';
import './App.css';
// import { useNavigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user=>{
      setUser(user);
      // if(user){
      //   // navigate('/form', {replace: true});
      //   window.location.href = '/form';
      // }
    });
    return()=>{
      unsubscribe();
    }
  });

  return (
    <div className="App">
        <Nav user={user} />
        <Main user={user} />
    </div>
  );
}

export default App;
