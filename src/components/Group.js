import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Tasks from './Tasks';
import { ConfirmDelete } from './ConfirmDelete';

const Group = ({ group, expand, setExpand, setGroups }) => {
  const [removeBox, setRemoveBox] = useState({
    show: false,
    item: null,
  });

  const removeGroup = (name) => {
    setGroups((draft) => {
      delete draft[name];
    });
  };

  const updateGroupTasks = ({ group, tasks }) => {
    setGroups((draft) => {
      draft[group.name].tasks = tasks;
    });
  };

  return (
    <motion.div key={group.name} className="group" layout>
      <motion.div className="groupHeader" layout>
        <button
          className="remove-btn"
          onClick={() => setRemoveBox({ show: true, item: group.name })}
        >
          x
        </button>
        <p className="title">
          {group.name} <span className="taskCount">{`(${Object.keys(group.tasks).length})`}</span>
        </p>
      </motion.div>
      <div className="taskBtn">
        {expand.selectedGroup === group.name ? (
          <motion.button
            className="minimize"
            onClick={() => setExpand({ selectedGroup: null })}
            layout
          >
            -
          </motion.button>
        ) : (
          <motion.button
            className="expand"
            onClick={() => setExpand({ selectedGroup: group.name })}
            layout
          >
            +
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {expand.selectedGroup === group.name && (
          <Tasks group={group} updateGroupTasks={updateGroupTasks} />
        )}
      </AnimatePresence>

      {removeBox.show && removeBox.item === group.name && (
        <ConfirmDelete
          deleteFunc={removeGroup}
          deleteItem={removeBox.item}
          closeCallback={() => setRemoveBox({ show: false })}
        />
      )}
    </motion.div>
  );
};

export default Group;
