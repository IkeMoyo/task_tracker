import Task from "./Task";

const Tasks = ({tasks, onToogle, onDelete}) => {
    return (
        <>
            {tasks.map(task => <Task key={task.id} onToogle={onToogle} onDelete={onDelete}  task={task}/>)}
        </>
      );
}
 
export default Tasks;