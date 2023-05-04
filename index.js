import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase,ref,push,onValue,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-b0a61-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const toDoList = ref(database, "ToDoList")

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const toDoListEl = document.getElementById("todolist");

addButtonEl.addEventListener("click", function() {

    let inputValue = inputFieldEl.value;

    clearInputField();

    push(toDoList,inputValue)

}); 

// for changing the snapshot.val into an array
onValue(toDoList, function(snapshot) {

    if (snapshot.exists()){

    var objectArray = Object.entries(snapshot.val())

    clearToDoListEl();

    for(let i=0; i<objectArray.length; i++){
        
        let currentItem = objectArray[i];
        let currentItemId = currentItem[0];
        let currentItemValue= currentItem[1];

        appendToToDoListEl(currentItem);
    }}else {
        toDoListEl.innerHTML = "No items here.... yet"
}
});

var clearToDoListEl = () => {
    toDoListEl.innerHTML = "";
};

function clearInputField() {
    inputFieldEl.value = "";
};

function appendToToDoListEl(item) {
    let itemId = item[0];
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue;

    newEl.addEventListener("dblclick", function (){

        let exactLocationOfItemInDb = ref(database,`ToDoList/${itemId}`);
        remove(exactLocationOfItemInDb);
    })

    toDoListEl.append(newEl);
};