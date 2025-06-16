
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let indexToBeDeleted = null;

document.getElementById("taskForm").addEventListener("submit", handleFormSubmit);

const alertPlaceholder = document.getElementById("alertPlaceholder");
// Function to show Bootstrap alert messages
function showAlert(message, type = "success") {
  const alert = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
  alertPlaceholder.innerHTML = alert;

  // Automatically hide alert after 3 seconds
  setTimeout(() => (alertPlaceholder.innerHTML = ""), 3000);
}

// Function to update the total number of tasks shown
function updateTaskCount() {
  taskCount.textContent = tasks.length;
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        showAlert("Task cannot be empty!", "warning");
        return;
    }

    if (taskText !== "") {
        const newTask = {
            text: taskText,
            completed: false,
            
        };
        tasks.push(newTask);
        saveTasks();
        taskInput.value = "";
        renderTasks();

        showAlert("Task added successfully!");
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Initial render
renderTasks();

// Render all tasks
function renderTasks() {
    const taskContainer = document.getElementById("taskContainer");
    taskContainer.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("card", "m-2", "p-3");
        taskCard.style.width = "250px";

        if (task.completed) {
            taskCard.classList.add("bg-success", "text-decoration-none");
        } else {
            taskCard.classList.add("bg-warning");
      }
      

      const taskText = document.createElement("span");
      if (task.completed) {
        taskText.classList.add("text-decoration-line-through")
      }
        taskText.textContent = task.text;

        const taskStatus = document.createElement("p");
        taskStatus.classList.add("small", "fw-bold");
        // taskStatus.textContent = task.completed ? "Completed" : "Pending";

      const toggleButton = document.createElement("button");
        toggleButton.classList = task.completed ? "btn btn-sm btn-outline-light mb-2" : "btn btn-sm btn-outline-light mb-2";
        toggleButton.textContent = task.completed ? "Completed" : "Pending";

        toggleButton.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-sm btn-danger";
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => {
      // Remove the task from the array
        tasks.splice(index, 1);
      saveTasks(); // Save updated list
      renderTasks(); // Re-render the list
      showAlert("Task deleted!", "danger"); // Show alert
    };


        taskCard.appendChild(taskText);
        taskCard.appendChild(taskStatus);
        taskCard.appendChild(toggleButton);
        taskCard.appendChild(deleteButton);
        taskContainer.appendChild(taskCard);
    });
    updateTaskCount();
}

// Handle modal show and track index
const deleteModal = document.getElementById("deleteModal");
deleteModal.addEventListener("show.bs.modal", function (event) {
    const button = event.relatedTarget;
    indexToBeDeleted = parseInt(button.getAttribute("data-index"));
});

