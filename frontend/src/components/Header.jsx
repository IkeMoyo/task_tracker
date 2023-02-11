const Header = ({onShowAddTask, showAddTask}) => {
    return (
        <header className="header">
            <h1>Task Tracker</h1>
            <button onClick={onShowAddTask} className="btn" style={{backgroundColor: `${showAddTask? 'red': 'green'}`}}>{showAddTask ? 'Close': 'Open'}</button>
        </header>
      );
}
 
export default Header;