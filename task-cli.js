//Requiring file system module
const fs = require('fs');

//Get the arguments from user
const args = process.argv.slice(2); 
const path = "./tasks.json"

validArgs = ["add"]
const validateArgs = (args) => {
    //Check if the arguments array exists and that it is populated by the user
    if (!args || args.length === 0){
        console.log("Must provide at least one arugment to use tool!");
        process.exit(1);
    }

    //Check if the first argument is valid
    if (!validArgs.includes(args[0])){
        console.log("This is not a valid argument!")
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

    const newTask = {
        id: tasks.length + 1,
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
        console.log("Ran the delete function");
        break;
    default:
        console.log("Did nothing here ");
        break;
}






