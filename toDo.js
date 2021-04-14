let tasks = [];

function getTime() {
  var date = new Date();
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return (
    dd + "/" + mm + "/" + yyyy + " @ " + hours + ":" + minutes + " " + ampm
  );
}

function getTasks() {
  data = localStorage.getItem("tasks");
  if (data != null) tasks = JSON.parse(data);
  return tasks;
}

function addTasks() {
  tasks = getTasks();
  let length = 0;
  let id = 1;
  if (tasks.length > 0) {
    length = tasks.length;
    id = tasks[length - 1].id;
    id = id + 1;
  }

  var time = getTime();

  tasks.push({
    id: id,
    title: document.getElementById("task").value,
    completed: false,
    time: time,
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById("task").value = "";
  displayTasks();
}

function handleEditTask(obj) {
  let titleInput = document.getElementById("title-value" + obj.id);
  titleInput.disabled = false;
  titleInput.addEventListener("input", function (evt) {
    obj.title = titleInput.value;
    localStorage.clear();
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
}

function handleDoneTask(obj) {
  obj.completed = true;
  localStorage.clear();
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

function handleDeleteTask(object) {
  tasks = getTasks();
  let index = 0;
  tasks.forEach((obj, i) => {
    if (obj.id == object.id) {
      index = i;
    }
  });
  tasks.splice(index, 1);
  localStorage.clear();
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

function displayTasks() {
  if (document.getElementById("list-item-container")) {
    document.body.removeChild(document.getElementById("list-item-container"));
  }
  tasks = getTasks();
  let listItemContainer = document.createElement("div");
  listItemContainer.classList.add("list-item-container");
  listItemContainer.setAttribute("id", "list-item-container");

  tasks.map((obj) => {
    let todoListItem = document.createElement("div");
    todoListItem.classList.add("todo-list-item");
    if (obj.completed) {
      todoListItem.classList.add("overlay");
    }
    todoListItem.setAttribute("id", "todo-list-item" + obj.id);

    let titleAndTime = document.createElement("div");
    titleAndTime.classList.add("title-and-time");

    let taskTitle = document.createElement("div");
    taskTitle.classList.add("task-title");

    let taskIcon = document.createElement("i");
    taskIcon.classList.add("fas");
    taskIcon.classList.add("fa-stream");

    let title = document.createElement("input");
    title.classList.add("title-value");
    title.setAttribute("id", "title-value" + obj.id);
    title.disabled = true;
    title.value = obj.title;

    let taskTime = document.createElement("div");
    taskTime.classList.add("task-time");

    let time = document.createElement("p");
    time.innerHTML = obj.time;

    let taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");

    let actionIconOne = document.createElement("button");
    actionIconOne.classList.add("action-icon");
    actionIconOne.setAttribute("id", "action-icon-one" + obj.id);
    if (obj.completed) {
      actionIconOne.disabled = true;
    }
    let editIcon = document.createElement("i");
    editIcon.classList.add("fas");
    editIcon.classList.add("fa-pencil-alt");
    actionIconOne.onclick = () => handleEditTask(obj);

    let actionIconTwo = document.createElement("button");
    actionIconTwo.classList.add("action-icon");
    actionIconTwo.setAttribute("id", "action-icon-two" + obj.id);
    if (obj.completed) {
      actionIconTwo.disabled = true;
    }
    let doneIcon = document.createElement("i");
    doneIcon.classList.add("fas");
    doneIcon.classList.add("fa-check");
    doneIcon.onclick = () => handleDoneTask(obj);

    let actionIconThree = document.createElement("button");
    actionIconThree.classList.add("action-icon");
    actionIconThree.setAttribute("id", "action-icon-three" + obj.id);
    if (obj.completed) {
      actionIconThree.setAttribute = true;
    }
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas");
    deleteIcon.classList.add("fa-times");
    deleteIcon.onclick = () => handleDeleteTask(obj);

    listItemContainer.appendChild(todoListItem);

    todoListItem.appendChild(titleAndTime);
    titleAndTime.appendChild(taskTitle);
    taskTitle.appendChild(taskIcon);
    taskTitle.appendChild(title);

    titleAndTime.appendChild(taskTime);
    taskTime.appendChild(time);

    todoListItem.appendChild(taskActions);
    taskActions.appendChild(actionIconOne);
    actionIconOne.appendChild(editIcon);

    taskActions.appendChild(actionIconTwo);
    actionIconTwo.appendChild(doneIcon);

    taskActions.appendChild(actionIconThree);
    actionIconThree.appendChild(deleteIcon);
  });
  document.body.appendChild(listItemContainer);
}
