# Task Tracker (CLI APPLICATION)

This a command line tool that saves your to-do list items into a json
Challenge for the application is uploaded here -> [task-tracker](https://roadmap.sh/projects/task-tracker) from [roadmap.sh](https://roadmap.sh/backend)

## How to use CLI tool
1. Clone the repository: 
```git clone https://github.com/ZachWright-Dev/task-cli.git```
2. Follow example usage to start using the application

### Use add to create an entry in todo list
```
node task-cli.js add "Buy groceries" 
```
### Use update to modify the description using item ID
```
node task-cli.js update 1
```
### Use delete to remove an entry from todo list
```
node task-cli.js delete 1
```

### Use 'mark-in-progress', 'mark-done', 'mark-todo' to modify tasks status
```
node task-cli.js mark-done 1
```
### Use 'list-in-progress', 'list-done', 'list-todo' to list tasks of a particular status
```
node task-cli.js list-todo
```


