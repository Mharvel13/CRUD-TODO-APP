// TO DO LIST APP

// Modal functionality

//  Get Modal Elements
let modal = document.getElementById("modal");
let modalbutton = document.getElementById("button");
let closeXbutton = document.getElementById("closeBtn");
let closebutton = document.getElementById("closeButton");

modalbutton.addEventListener("click", openmodal);
closeXbutton.addEventListener("click", closemodal);
closebutton.addEventListener("click", closemodal);

function openmodal() {
  modal.style.display = "block";
}

function closemodal() {
  modal.style.display = "none";
}


// Todo Functionality


// Get Todo Elements
let inputTask = document.getElementById("task");
let dateInput = document.getElementById("date");
let taskDesc = document.getElementById("desc");
let addTaskButton = document.getElementById("addButton");
let errorMessage = document.querySelector(".errorMsg");
let tasks = document.querySelector(".tasks");

let data = [];

addTaskButton.addEventListener("click", (e) => {
  validation();
  clearInputs();
});

// Check for input values and accept inputed data
function validation() {
  if (!inputTask.value) {
    errorMessage.innerHTML = "Please input a task";
    // errorMessage.style.color = 'red'
  } else {
    errorMessage.innerHTML = "";
    acceptData();
    closemodal();
  }
}

// Clear input flieds
function clearInputs() {
  inputTask.value = "";
  dateInput.value = "";
  taskDesc.value = "";
}

function acceptData() {

  // Push data object to an array
  data.push({
    title: inputTask.value,
    date: dateInput.value,
    details: taskDesc.value,
  });

  // Set Local Storage
  localStorage.setItem("tasksList", JSON.stringify(data));
  console.log(data);
  
  createTask();
}


// Creating the new tasks
function createTask() {
  tasks.innerHTML ='';

  //filter the data array and return the individual array and use it to update the tasks inner elements.
  data.map((x, y) => {
    return (tasks.innerHTML += `
        <div id="${y}">
            <h4>${x.title}</h4>
            <p> ${x.details}</p>
            <small>Date Due: ${x.date}</small>
            <span class="options">
            <i class="fas fa-edit" onclick="editTask(this)"></i>
            <i class="fas fa-trash-alt" onclick="deleteTask(this)"></i>
        </span>      
        </div>
    
        `);
  });
};


// Deleting the tasks
function deleteTask(e) {
  // Traverse the dom and Remove the task div from the tasks container
  e.parentElement.parentElement.remove();
  
  // Remove the deleted task from the array
  data.splice(e.parentElement.parentElement.id, 1);

  // Update Local storage
  localStorage.setItem("tasksList", JSON.stringify(data));


}

// Editing the tasks
function editTask(e){
  // Acess the Parent Task Div
  let selectedTask = e.parentElement.parentElement;
  
  // open modal to allow edititng
  openmodal()

  // Access the individual child elements of the task div and modify them
  inputTask.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[2].innerHTML;
  taskDesc.value = selectedTask.children[1].innerHTML;
  
  // Call the delete task function to delete previous entry
  deleteTask(e);
}


// Display saved tasks automaically on reload 
displayTasksOnReload();
function displayTasksOnReload() {
        data = JSON.parse(localStorage.getItem('tasksList')) || [];
        console.log(data);
        createTask();
};

// localStorage.clear()
