import './App.scss';
import { useState, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { AnimatePresence, motion, AnimateSharedLayout } from 'framer-motion';

import { GroupForm } from './Forms';
import Group from './Group';



function Groups() {
  const [groups, setGroups] = useImmer(JSON.parse(localStorage.getItem('Groups')) || {});
  const [expand, setExpand] = useState({
    groupForm: false,
    selectedGroup: null,
  });

  
  const addGroup = (name) => {
    setGroups(draft => {
      draft[name] = {
        name,
        tasks: {}
      };
    })
  }


  useEffect(() => {
    // Initialize General Group if empty
    if (Object.keys(groups).length === 0) {
      addGroup('General');
    }
    localStorage.setItem('Groups', JSON.stringify(groups));
  })

  return (
    <AnimateSharedLayout>
      <motion.div className='groups' layout>
        <motion.div className='head-bar' layout>
          <h2>Groups</h2>
          <button className='new-btn' onClick={() => setExpand({ groupForm: (expand.groupForm) ? false : true })}>{(expand.groupForm) ? '-' : '+'}</button>
        </motion.div>
        
        <AnimatePresence>
          {expand.groupForm &&
              <GroupForm 
                addGroup={addGroup}
                exitForm={() => setExpand({ groupForm: false })}
              /> 
            // </motion.div> 
          }
        </AnimatePresence>

          {Object.entries(groups).map(([groupName, group], i) => (
            <Group group={group} expand={expand} setExpand={setExpand} setGroups={setGroups} key={i}/>)
          )}

      </motion.div>
    </AnimateSharedLayout>
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
