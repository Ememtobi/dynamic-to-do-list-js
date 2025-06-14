// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage and populate the list
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Save tasks array to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Get current tasks from Local Storage
    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    // Function to add a new task to the list
    function addTask(taskText, save = true) {
        // If called from button/input, get value from input
        if (taskText === undefined) {
            taskText = taskInput.value.trim();
        }

        // Check if the input is not empty
        if (taskText !== "") {
            // Create a new list item and set its text
            const li = document.createElement('li');
            li.textContent = taskText;

            // Create a remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = "Remove";
            removeBtn.classList.add('remove-btn');

            // Set up the remove button to remove the task item and update Local Storage
            removeBtn.onclick = function () {
                taskList.removeChild(li);
                // Remove from Local Storage
                let tasks = getTasks();
                tasks = tasks.filter(t => t !== taskText);
                saveTasks(tasks);
            };

            // Append remove button to the list item
            li.appendChild(removeBtn);

            // Append the list item to the task list
            taskList.appendChild(li);

            // Save to Local Storage if needed
            if (save) {
                let tasks = getTasks();
                tasks.push(taskText);
                saveTasks(tasks);
            }

            // Clear the input field if task was added via input
            if (taskInput.value.trim() === taskText) {
                taskInput.value = "";
            }
        } else if (save) {
            alert("Please enter a task.");
        }
    }

    // Add event listener to the "Add Task" button
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Add event listener to the input field for "Enter" key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});