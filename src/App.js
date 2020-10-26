import './App.css';
import { useState } from 'react';

import GroupForm from './GroupForm';


function Groups() {
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const removeGroup = (group) => localStorage.removeItem(group);

  return (
    <div className='groups'>
      <button onClick={setShowGroupForm(true)}>+</button>
      <ul>
        {Object.keys(localStorage).map((group) => {
          return (
            <li key={group}>
              <button onClick={() => removeGroup.bind(group)}>x</button>
              <p onClick={() => setSelectedGroup.bind(group)}>{group.name}</p>
            </li>
          )
        })}
      </ul>
      { showGroupForm && <GroupForm /> }
      { selectedGroup && <Tasks group={selectedGroup}/> }
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
