import './App.scss';
import { useState, useEffect } from 'react';

import { GroupForm } from './Forms';
import Tasks from './Tasks';
import { ConfirmDelete } from './ConfirmDelete';
import { useImmer } from 'use-immer';
import { AnimatePresence, motion } from 'framer-motion';

const formVariants = {
  open : {
      scale: 1,
      opacity: 1,
  },
  closed: {
      opacity: 0,
      originX: 0.8,
      originY: 0,
      scale: 0,
  }
}



function Groups() {
  const [groups, setGroups] = useImmer(JSON.parse(localStorage.getItem('Groups')) || {});
  const [expand, setExpand] = useState({
    groupForm: false,
    selectedGroup: null,
  });
  const [removeBox, setRemoveBox] = useState({
    show: false,
    item: null,
  });
  
  const addGroup = (name) => {
    setGroups(draft => {
      draft[name] = {
        name,
        tasks: {}
      };
    })
  }

  const removeGroup = (name) => {
    setGroups(draft => {
      delete draft[name];
    })
  } 

  const updateGroupTasks = ({ group, tasks }) => {
    setGroups(draft => {
      draft[group.name].tasks = tasks;
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
    <div>
      <div className='groups'>
        <div className='head-bar'>
          <h2>Groups</h2>
  <button className='new-btn' onClick={() => setExpand({ groupForm: (expand.groupForm) ? false : true })}>{(expand.groupForm) ? '-' : '+'}</button>
        </div>
        <AnimatePresence>
          {expand.groupForm &&
            <motion.div
              variants={formVariants}
              initial='closed'
              animate='open'
              exit='closed'
              key='form'
            >
              <GroupForm 
                addGroup={addGroup}
                exitForm={() => setExpand({ groupForm: false })}
              /> 
            </motion.div> 
          }
        </AnimatePresence>
        <ul>
          {Object.entries(groups).map(([groupName, groupObj]) => {
            return (
              <li key={groupName} className='group'>
                <div className='groupHeader'>
                  <button className='remove-btn' onClick={() => setRemoveBox({ show: true, item: groupName, })}>x</button>
                  <p className='title'>{groupName}</p>
                </div>
                <div className='taskBtn'>
                  {expand.selectedGroup === groupName 
                    ?
                      <button className='minimize' onClick={() => setExpand({ selectedGroup: null })}>-</button>
                    :
                      <button className='expand' onClick={() => setExpand({ selectedGroup: groupName })}>+</button>
                  }
                </div>
                <AnimatePresence exitBeforeEnter>
                  {expand.selectedGroup === groupName && 
                    <Tasks group={groupObj} updateGroupTasks={updateGroupTasks}/>
                  }
                </AnimatePresence>
                {removeBox.show && (removeBox.item === groupName) &&
                  <ConfirmDelete 
                    deleteFunc={removeGroup}
                    deleteItem={removeBox.item}
                    closeCallback={() => setRemoveBox({ show: false, })}
                  />
                }
              </li>
            )
          })}
        </ul>
      </div>
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
