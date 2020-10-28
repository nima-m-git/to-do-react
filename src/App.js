import './App.scss';
import { useState, useEffect } from 'react';

import { GroupForm } from './Forms';
import Tasks from './Tasks';


function Groups() {
  const groups = () => Object.keys(localStorage);
  const [expand, setExpand] = useState({
    groupForm: false,
    selectedGroup: null,
  })

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
        <button onClick={() => setExpand({ groupForm: true })}>+</button>
        <ul>
          {groups().map((group) => {
            return (
              <li key={group} className='group'>
                <button className='remove-btn' onClick={() => removeGroup(group)}>x</button>
                <p className='title' onClick={() => setExpand({ selectedGroup: (expand.selectedGroup === group) ? null : group })}>{group}</p>
                {expand.selectedGroup === group && 
                  <Tasks group={group} />
                }
              </li>
            )
          })}
        </ul>
      </div>
      {expand.groupForm && 
        <GroupForm 
          addGroup={addGroup}
          exitForm={() => setExpand({ groupForm: false })}
        /> 
      }
    </div>
  )
}


function App() {
  return (
    <div className="App">
      <header>
        <h1>To-Do</h1>
      </header>
      <Groups />
    </div>
  );
}

export default App;
