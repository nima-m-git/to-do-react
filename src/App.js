import './App.css';
import { useState, useEffect } from 'react';

import { GroupForm } from './Forms';
import Tasks from './Tasks';


function Groups() {
  const groups = () => Object.keys(localStorage);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const addGroup = (name) => localStorage.setItem(name, JSON.stringify(
    { 
      name,
      tasks: {} 
    }));

  const removeGroup = (name) => localStorage.removeItem(name);

  useEffect(() => {
    // Initialize General Group if empty
    if (groups().length === 0) {
      addGroup('General');
    }
  })

  return (
    <div>
      <div className='groups'>
        <h2>Groups</h2>
        <button onClick={() => setShowGroupForm(true)}>+</button>
        <ul>
          {groups().map((group) => {
            return (
              <li key={group}>
                <button onClick={() => removeGroup(group)}>x</button>
                <p onClick={() => setSelectedGroup(group)}>{group}</p>
              </li>
            )
          })}
        </ul>
      </div>
      {showGroupForm && 
        <GroupForm 
          addGroup={addGroup}
          exitForm={() => setShowGroupForm(false)}
        /> 
      }
      {selectedGroup && 
        <Tasks 
          group={selectedGroup}
        /> 
      }
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
