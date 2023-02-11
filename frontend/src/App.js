import Header from "./components/Header";
import React, { Component } from 'react';
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

class App extends Component {
  state = {
      tasks: [],
      showAddTask: true
    }
  
  componentDidMount() {
    this.fetchTasks()
  }

  // Get Cookies
  getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

  csrftoken = this.getCookie('csrftoken');
  
  // Fetch tasks from database
  fetchTasks = () => {
    fetch("http://localhost:8000/api/tasks/")
    .then(response => response.json())
    .then(data => this.setState({tasks: data}))
  }

  // Fetch Task
  fetchTask = async (task) => {
    const response = await fetch(`http://localhost:8000/api/tasks/${task.id}`)
    const data = await response.json()

    return data
  }

  // Add task
  addTask = (task) => {
    fetch("http://localhost:8000/api/tasks/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        'X-CSRFToken': this.csrftoken
      },
      body: JSON.stringify(task)
    })
    .then(response => response.json())
    .then(data => this.setState({tasks: [...this.state.tasks, data]}))
  }

  // Toggle Reminder
  toggleReminder = async (task) => {
    const targetTask = await this.fetchTask(task)
    const updatedTask = {...targetTask, reminder: !targetTask.reminder} 

    fetch(`http://localhost:8000/api/tasks/${task.id}/`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        'X-CSRFToken': this.csrftoken
      },
      body: JSON.stringify(updatedTask)
    })
    .then(response => this.fetchTasks())
  }

  // Delete Task
  handleDelete = (task) => {
    fetch(`http://localhost:8000/api/tasks/${task.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(response => this.fetchTasks())
  }
  

  render() { 
    return (
      <div className="container">
        <Header onShowAddTask={() => this.setState({showAddTask: !this.state.showAddTask})} showAddTask={this.state.showAddTask}/>
        {this.state.showAddTask && <AddTask onAddTask={this.addTask}/>}
        {this.state.tasks.length === 0? "There are no tasks available": <Tasks onDelete={this.handleDelete} onToogle={this.toggleReminder} tasks={this.state.tasks}/>}
    </div>
    );
  }
}
 
export default App;

