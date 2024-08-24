//Requiring file system module
const fs = require('fs');

//Get the arguments from user
const args = process.argv.slice(2); 
const path = "./tasks.json"

const validateArgs = (args) => {
    //Check if the arguments array exists and that it is populated by the user
    if (!args || args.length === 0){
        console.log("Must provide at least one arugment to use tool!");
        process.exit(1);
    }
}

validateArgs(args)


const addTask = (args) => {
    if (args.length !== 2){
        console.log("Incorrect amount of arguments!")
        process.exit(1);
    } 

    //Get the array from the json file, push the new object to the array and write this new array into the json file
    const tasks = readTasks();

    //Creating format for date string
    const newDate = new Date(Date.now()).toLocaleDateString("en-US", {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    })


    let newID;
    //Janky logic to remove possibility of duplicate ID's
    if (tasks.length === 0){
        newID = 1
    } else {
        newID = tasks[tasks.length - 1].id + 1
    }

    const newTask = {
        id: newID,
        description: args[1],
        status: "todo",
        createdAt: newDate,
        updatedAt: newDate 
    }

    //Update the array
    tasks.push(newTask);

    //Update the file
    writeTasks(tasks);

    console.log(`Task added successfully ID:${tasks.length}`)
}

const deleteTask = (args) => {
    if (args.length !== 2 || !Number.isInteger(parseInt(args[1], 10))) {
        console.log("Second argument was not an integer!")
        process.exit(1);
    }

    //Get the array of javascript objects
    const tasks = readTasks();

    const id = parseInt(args[1])

    const newTasks = tasks.filter((task) => {
        return task.id !== id
    });

    writeTasks(newTasks);
    console.log(`Deleted task with ID:${id}`)
}

const updateTask = (args) => {
    //Run if not 3 args or second arg is not an int
    if (args.length !== 3 || !Number.isInteger(parseInt(args[1], 10))){
        console.log("Invalid usage of update Function");
        process.exit(1);
    }
    
    //New description for the update
    const description = args[2]
    const id = parseInt(args[1]);
    
    const tasks = readTasks();

    const newTasks = tasks.map((task) => {
        return task.id === id ? {...task, description: description} : task
    });

    writeTasks(newTasks);
    console.log(`Updated task with ID:${id}`)
}

const markProgess = (args) => {
    if (args.length !== 2 || !Number.isInteger(parseInt(args[1], 10))){
        console.log(args)
        console.log("Invalid usage of mark-in-progess Function");
        process.exit(1);
    }

    const id = parseInt(args[1])
    const tasks = readTasks();
    const newTasks = tasks.map((task) => {
        return task.id === id ? {...task, status:"in progress"} : task;
    })

    writeTasks(newTasks);
    console.log(`Updated the status to "in progress" for ID:${id}`);
}

const markDone = (args) => {
    if (args.length !== 2 || !Number.isInteger(parseInt(args[1], 10))){
        console.log(args)
        console.log("Invalid usage of mark-done Function");
        process.exit(1);
    }

    const id = parseInt(args[1])
    const tasks = readTasks();
    const newTasks = tasks.map((task) => {
        return task.id === id ? {...task, status:"done"} : task;
    })

    writeTasks(newTasks);
    console.log(`Updated the status to "done" for ID:${id}`);
}

const listDone = () => {
    const tasks = readTasks();
    const displayTasks = tasks.filter(task => task.status === "done");
    console.log(displayTasks);
}

const listToDo = () => {
    const tasks = readTasks();
    const displayTasks = tasks.filter(task => task.status === "todo");
    console.log(displayTasks);
}

const listInProgress = () => {
    const tasks = readTasks();
    const displayTasks = tasks.filter(task => task.status === "in progress");
    console.log(displayTasks);
}

const readTasks = () => {
    //Returns a string of json file
    const stringData = fs.readFileSync(path, 'utf-8');
    const data = JSON.parse(stringData)

    //Returns the array of javascript objects instead of strings
    return data
}

const writeTasks = (tasks) => {
    fs.writeFileSync(path, JSON.stringify(tasks, null, 2), 'utf-8')
}

//Create a file if it does not exist
if (!fs.existsSync(path)) {
    fs.writeFileSync(path, "[]");
}

switch(args[0].toLowerCase()) {
    case "add":
        console.log("Ran the add function")
        addTask(args);
        break;
    case "delete":
        console.log("Ran the update function")
        deleteTask(args);
        break;
    case "update":
        console.log("Ran the update function")
        updateTask(args);
        break;
    case "mark-in-progress":
        markProgess(args);
        break;
    case "mark-done":
        markDone(args);
        break;
    case "list-done":
        listDone();
        break;
    case "list-todo":
        listToDo();
        break;
    case "list-in-progress":
        listInProgress();
        break;
    default:
        console.log("Did not enter a valid command");
        process.exit(1);
}