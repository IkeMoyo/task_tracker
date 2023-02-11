import {FaTimes} from 'react-icons/fa'

const Task = ({task, onToogle, onDelete}) => {
    return (
        <div className={`task ${task.reminder && 'reminder'}`} onDoubleClick={() => onToogle(task)}>
            <h3>{task.title} <FaTimes onClick={() => onDelete(task)} style={{color: 'red'}}/></h3>
            <p>{task.date}</p>
        </div>
      );
}
 
export default Task;