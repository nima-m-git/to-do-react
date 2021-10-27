import { motion } from 'framer-motion';
import { ConfirmDelete } from './ConfirmDelete';
import { useState } from 'react';
import { useMeasurePosition } from '../use-measure-position';

const variants = {
  closed: {
    opacity: 0,
    translateY: 40,
  },
  open: {
    opacity: 1,
    translateY: 0,
  },
};

const Task = ({ task, removeTask, updateTask, setTaskForm, i, updatePosition, updateOrder }) => {
  const [removeBox, setRemoveBox] = useState({
    show: false,
    item: null,
  });

  const completeTaskToggle = (task) =>
    updateTask({
      ...task,
      completed: !task.completed,
    });

  const [isDragging, setDragging] = useState(false);

  const ref = useMeasurePosition((pos) => updatePosition(i, pos));

  return (
    <li style={{ zIndex: isDragging ? 3 : 1 }}>
      <motion.div
        className="task"
        ref={ref}
        layout
        initial={false}
        drag="y"
        onDragStart={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragEnd={() => setDragging(false)}
        onViewportBoxUpdate={(_viewportBox, delta) => {
          isDragging && updateOrder(i, delta.y.translate);
        }}
      >
        <button
          className="remove-btn"
          onClick={() =>
            setRemoveBox({
              show: true,
              item: task,
            })
          }
        >
          x
        </button>
        <p
          className={`title${task.completed ? ' crossed' : ''}`}
          onClick={() => {
            setTaskForm({
              show: true,
              action: 'update',
              selected: task,
            });
          }}
        >
          {task.title}
        </p>
        <button className="complete-btn" onClick={() => completeTaskToggle(task)}>
          &#10003;
        </button>
      </motion.div>

      {removeBox.show && removeBox.item.id === task.id && (
        <ConfirmDelete
          deleteFunc={removeTask}
          deleteItem={removeBox.item}
          closeCallback={() => setRemoveBox({ show: false })}
        />
      )}
    </li>
  );

  // return (
  //     <motion.li variants={variants} layout>
  //         <div className='task'>
  //             <button className='remove-btn' onClick={() => setRemoveBox({
  //                 show: true,
  //                 item: task,
  //             })}>x</button>
  //             <motion.p layout className={`title${(task.completed) ? ' crossed' : ''}`} onClick={() => {
  //                 setTaskForm({
  //                     show: true,
  //                     action: 'update',
  //                     selected: task,
  //                 });
  //             }}>{task.title}</motion.p>
  //             <button className='complete-btn' onClick={() => completeTaskToggle(task)}>&#10003;</button>
  //         </div>

  //         {removeBox.show && (removeBox.item.id === task.id) &&
  //             <ConfirmDelete
  //                 deleteFunc={removeTask}
  //                 deleteItem={removeBox.item}
  //                 closeCallback={() => setRemoveBox({ show: false, })}
  //             />
  //         }
  //     </motion.li>
  // )
};

function Item({ i, height, updatePosition, updateOrder }) {
  const [isDragging, setDragging] = useState(false);

  const ref = useMeasurePosition((pos) => updatePosition(i, pos));

  return (
    <li
      style={{
        padding: 0,
        height,
        // If we're dragging, we want to set the zIndex of that item to be on top of the other items.
        zIndex: isDragging ? 3 : 1,
      }}
    >
      <motion.div
        ref={ref}
        layout
        initial={false}
        style={{
          background: 'white',
          height,
          borderRadius: 5,
        }}
        whileHover={{
          scale: 1.03,
          boxShadow: '0px 3px 3px rgba(0,0,0,0.15)',
        }}
        whileTap={{
          scale: 1.12,
          boxShadow: '0px 5px 5px rgba(0,0,0,0.1)',
        }}
        drag="y"
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        onViewportBoxUpdate={(_viewportBox, delta) => {
          isDragging && updateOrder(i, delta.y.translate);
        }}
      />
    </li>
  );
}

// export default Task

export { Task, Item };
