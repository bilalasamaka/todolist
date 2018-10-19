import React, { Component } from 'react';
import {TodoList} from "./todoList";
import {TodoForm} from "./todoForm";


class App extends Component {
    constructor() {
        super();
        let myTasks = [
            {text: 'Deneme1', status: 'passive'},
            {text: 'Deneme2', status: 'active'},
        ];
        let localTasks = localStorage.getItem('tasks');
        if (localTasks!==null){
            localTasks = JSON.parse(localTasks);
            myTasks = localTasks;
        }
        this.state = {
            tasks: myTasks
        };
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.doneTask = this.doneTask.bind(this);
    }
    addTask(task) {
        let updatedList = this.state.tasks;
        updatedList.push({text: task, status: 'passive'});
        this.setState({tasks: updatedList});
        this.updateLocalStorage(updatedList);
    }

    removeTask(task_id) {
        let updatedList = this.state.tasks;
        updatedList.splice(task_id.replace('task_', ''), 1);
        this.setState({tasks: updatedList});
        this.updateLocalStorage(updatedList);
    }
    doneTask(task_id) {
        let updatedList = this.state.tasks;
        let currentStatus = updatedList[task_id.replace('task_', '')].status;
        let newStatus = 'active';
        if (currentStatus === 'active') {
            newStatus = 'passive';
        }
        updatedList[task_id.replace('task_', '')].status = newStatus;
        this.setState({tasks: updatedList});
        this.updateLocalStorage(updatedList);
    }
    updateLocalStorage(updatedList){
        var updatedList = JSON.stringify(updatedList);
        localStorage.setItem('tasks',updatedList);
        return true;
    }
    render() {
        return (
            <div>
                <div className="content">
                    <div>
                        <TodoForm addTask={this.addTask}/>
                         <TodoList myList={this.state.tasks} addTask={this.addTask} removeTask={this.removeTask}
                         doneTask={this.doneTask}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
