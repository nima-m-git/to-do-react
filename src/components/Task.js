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


const Task = ({task, removeTask, updateTask, setTaskForm}) => {
    const [removeBox, setRemoveBox] = useState({
        show: false,
        item: null,
    });

    const completeTaskToggle = (task) => updateTask({
        ...task,
        completed: !task.completed,
    });

    return (
        <motion.li variants={variants} layout>
            <div className='task'>
                <button className='remove-btn' onClick={() => setRemoveBox({ 
                    show: true, 
                    item: task, 
                })}>x</button>
                <motion.p layout className={`title${(task.completed) ? ' crossed' : ''}`} onClick={() => {
                    setTaskForm({
                        show: true,
                        action: 'update',
                        selected: task,
                    });
                }}>{task.title}</motion.p>
                <button className='complete-btn' onClick={() => completeTaskToggle(task)}>&#10003;</button>
            </div>

            {removeBox.show && (removeBox.item.id === task.id) &&
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