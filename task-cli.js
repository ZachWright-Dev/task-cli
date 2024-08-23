//Requiring file system module
const { Console } = require('console');
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



//Create a file if it does not exist
if (!fs.existsSync(path)) {
    fs.writeFileSync(path, "[]");
}


//Check if the arguments are valid




switch(args[0].toLowerCase()) {
    case "add":
        console.log("Ran the add function")
        break;
    case "delete":
        console.log("Ran the delete function");
        break;
    default:
        console.log("Did nothing here ");
        break;
}






