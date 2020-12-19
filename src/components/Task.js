import { motion } from 'framer-motion';
import { ConfirmDelete } from './ConfirmDelete';
import { useState } from 'react';

const variants = {
    closed: {
        opacity: 0,
        translateY: 40,
    },
    open: {
        opacity: 1,
        translateY: 0,
    },
}


const Task = ({task, tasks, setTasks, setTaskForm}) => {
    const [removeBox, setRemoveBox] = useState({
        show: false,
        item: null,
    });

    const removeTask = (taskName) => {
        setTasks(draft => {
            delete draft[taskName];
        })
    }

    const completeTaskToggle = (task) => {
        setTasks(draft => {
            draft[task].completed = (tasks[task].completed) ? false : true;
        })
    }

    return (
        <motion.li 
            variants={variants}
        >
            <div className='task'>
                <button className='remove-btn' onClick={() => setRemoveBox({ show: true, item: task.title, })}>x</button>
                <p className={`title ${(task.completed) ? 'crossed' : ''}`} onClick={() => {
                    setTaskForm({
                        show: true,
                        action: 'update',
                        selected: task,
                    });
                }}>{task.title}</p>
                <button className='complete-btn' onClick={() => completeTaskToggle(task.title)}>&#10003;</button>
            </div>
            {removeBox.show && (removeBox.item === task.title) &&
                <ConfirmDelete 
                    deleteFunc={removeTask}
                    deleteItem={removeBox.item}
                    closeCallback={() => setRemoveBox({ show: false, })}
                />
            }
        </motion.li>
    )
}

export default Task