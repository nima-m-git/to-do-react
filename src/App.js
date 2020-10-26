import './App.css';
import { useState } from 'react';


const Groups = () => {
  const [showGroupForm, setShowGroupForm] = useState(false);
  
  const removeGroup = (group) => localStorage.removeItem(group);

  return (
    <div className='groups'>
      <button onClick={setShowGroupForm(true)}>+</button>
    </div>
  )
}


function App() {
  return (
    <div className="App">
      <Groups />
    </div>
  );
}

export default App;
