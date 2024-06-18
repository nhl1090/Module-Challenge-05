// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Function to save tasks and nextId to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("nextId", JSON.stringify(nextId));
}

// Function to generate a unique task id
function generateTaskId() {
    return nextId++;
}

// Function to create a task card
function createTaskCard(task) {
    const taskCard = $(`
        <div class="card mb-2" data-id="${task.id}">
            <div class="card-body">
                <h5 class="card-title">${task.title}</h5>
                <p class="card-text">${task.description}</p>
                <p class="card-text"><small class="text-muted">Due: ${task.dueDate}</small></p>
                <button class="btn btn-danger btn-sm delete-task">Delete</button>
            </div>
        </div>
    `);

    // Features for upcoming deadlines
    const currentDate = dayjs();
    const dueDate = dayjs(task.dueDate);
    if (dueDate.isBefore(currentDate)) {
        taskCard.addClass("border-danger");
    } else if (dueDate.diff(currentDate, "day") <= 2) {
        taskCard.addClass("border-warning");
    }

    return taskCard;
}

// Function to render the task list and make cards draggable
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

// Function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    const title = $("#taskTitle").val().trim();
    const description = $("#taskDescription").val().trim();
    const dueDate = $("#taskDueDate").val().trim();

    if (title && description && dueDate) {
        const task = {
            id: generateTaskId(),
            title,
            description,
            dueDate,
            status: "todo"
        };

        taskList.push(task);
        saveTasks();
        renderTaskList();

        $("#formModal").modal("hide");
        $("#taskForm")[0].reset();
    }
}

// Function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = $(event.target).closest(".card").data("id");
    taskList = taskList.filter(task => task.id !== taskId);
    saveTasks();
    renderTaskList();
}

// Function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = ui.draggable.data("id");
    const newStatus = $(this).attr("id").replace("-cards", "");

    const task = taskList.find(task => task.id === taskId);
    if (task) {
        task.status = newStatus;
        saveTasks();
        renderTaskList();
    }
}

// Changes made. When the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    $("#taskForm").on("submit", handleAddTask);
    $(document).on("click", ".delete-task", handleDeleteTask);

    $(".lane").droppable({
        accept: ".card",
        drop: handleDrop
    });

    $("#taskDueDate").datepicker({
        dateFormat: "yy-mm-dd"
    });
});