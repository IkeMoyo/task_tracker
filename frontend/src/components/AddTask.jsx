import { useState } from "react";

const AddTask = ({onAddTask}) => {

    const [title, setTitle] = useState("")
    const [date, setDate] = useState(new Date(0, 0, 0))
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        const task = {title, date, reminder}

        onAddTask(task)

        setTitle("")
        setDate(new Date(0, 0, 0))
        setReminder(false)
    } 
    
    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Title</label>
                <input type='text' placeholder='Add Title' value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <input type='datetime-local' value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input type='checkbox' value={reminder} checked={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>

            <input type='submit' value='Save Task' className="btn btn-block" />
        </form>
      );
}
 
export default AddTask;