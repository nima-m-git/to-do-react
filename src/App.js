import './App.css';
import { useState, useEffect } from 'react';

import { GroupForm } from './Forms';
import Tasks from './Tasks';


function Groups() {
  const groups = () => Object.keys(localStorage);
  const [expand, setExpand] = useState({
    groupForm: false,
    tasks: false,
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
              <li key={group}>
                <button className='remove' onClick={() => removeGroup(group)}>x</button>
                <p onClick={() => setExpand({ tasks: true })}>{group}</p>
                {expand.tasks && 
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
      <Groups />
    </div>
  );
}

export default App;
