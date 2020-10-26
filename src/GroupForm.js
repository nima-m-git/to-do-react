const { useState } = require("react");

function GroupForm () {
    const [name, setName] = useState('');

    const submit = e => localStorage.setItem(name, JSON.stringify({ tasks: {} }));

    return (
        <form onSubmit={() => submit}>
            <label for='name'>
                <input onChange={e => setName(e.target.value)}>{name}</input>
            </label>
        </form>
    )
}

export default GroupForm