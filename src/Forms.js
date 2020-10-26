import { useState } from 'react';


function GroupForm () {
    const [name, setName] = useState('');
    const submit = () => localStorage.setItem(name, JSON.stringify({ tasks: {} }));

    return (
        <form onSubmit={submit}>
            <label for='name'>
                <input type='text' onChange={(e) => setName(e.target.value)}>{name}</input>
            </label>
        </form>
    )
}


function TaskForm ({addTask}) {
    const [name, setName] = useState('');
    const [note, setNote] = useState('');
    const [dateBy, setDateBy] = useState(null);
    const submit = () => {
        const task = {
            name,
            note,
            dateBy,
        }
        addTask(task);
    }

    return (
        <form onSubmit={submit}>
            <label for='name'>
                <input type='text' onChange={(e) => setName(e.target.value)}>{name}</input>
            </label>
            <label for='note'>
                <input type='textfield' onChange={(e) => setNote(e.target.value)}>{note}</input>
            </label>
            <label for='dateBy'>
                <input type='date' onChange={(e) => setDateBy(e.target.value)}>{dateBy}</input>
            </label>
        </form>
    )
}

export { GroupForm, TaskForm, }