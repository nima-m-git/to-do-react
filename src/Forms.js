import { useState } from 'react';

function GroupForm ({ addGroup, exitForm, }) {
    const [title, setTitle] = useState('');
    const onSubmit = () => {
        addGroup(title);
        exitForm();
    }

    return (
        <form onSubmit={onSubmit}>
            <label>Title:
                <input type='text' onChange={(e) => setTitle(e.target.value)} value={title}/>
            </label>
            <input type='submit' value='Submit' />
        </form>
    )
}


function TaskForm ({ action, task, exitForm, }) {
    const [title, setTitle] = useState(task?.title || '');
    const [note, setNote] = useState(task?.note || '');
    const onSubmit = () => {
        const task = {
            title,
            note,
            completed: false,
        }
        action(task);
        exitForm();
    }


    return (
        <form onSubmit={onSubmit}>
            <label>Title:
                <input type='text' onChange={(e) => setTitle(e.target.value)} value={title}/>
            </label>
            <label>Note:
                <input type='textfield' onChange={(e) => setNote(e.target.value)} value={note}/>
            </label>
            <input type='submit' value='Submit'/>
        </form>
    )
}

export { GroupForm, TaskForm, }