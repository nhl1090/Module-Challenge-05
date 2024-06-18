// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Created a function to generate a unique task id
function generateTaskId() {
    function generateTaskId() {
        return nextId++;
}

// Created a function to create a task card
function createTaskCard(task) {
    let card = $(`<div class="card mb-3" data-id="${task.id}">
      <div class="card-body">
        <h5 class="card-title">${task.title}</h5>
        <p class="card-text">${task.description}</p>
        <p class="card-text"><small class="text-muted">Due: ${task.deadline}</small></p>
        <button class="btn btn-danger btn-sm delete-task">Delete</button>
      </div>
    </div>`);
  
    let deadline = dayjs(task.deadline);
    if (deadline.isBefore(dayjs(), 'day')) {
      card.addClass('bg-danger text-white');
    } else if (deadline.diff(dayjs(), 'day') <= 2) {
      card.addClass('bg-warning');
    }
  
    card.find('.delete-task').on('click', handleDeleteTask);
    return card;
  }

// Created a function to render the task list and make cards draggable
function renderTaskList() {
    $('#todo-cards, #in-progress-cards, #done-cards').empty();
    taskList.forEach(task => {
      let card = createTaskCard(task);
      $(`#${task.status}-cards`).append(card);
    });
  
    $('.card').draggable({
      revert: 'invalid',
      helper: 'clone'
    });
  }

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
