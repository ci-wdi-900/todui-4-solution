const readline = require('readline');
const data = require('./data.js')


let todos = data.todos;
const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const displayMenu = function() {
  const menu = `
Your options are:

1. Add a todo.
2. Remove a todo.
3. Remove all completed todos.
4. Toggle a todo's completion status.
5. Toggle a todo's priority.
6. Quit.

`

  interface.question(menu, handleMenu);
}

const displayTodos = function() {
  console.clear();
  console.log('\nHere are your current todos:\n')
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const num = i + 1;
    const mark = todo.isComplete === true ? '✅' : '✖';
    console.log(num + '. ' + todo.text + ' ' + mark);
  }
}

// or, without intermediate variables, and with a simplified ternary:
const displayTodosAlt1 = function() {
  console.log('\nHere are your current todos:\n')
  for (let i = 0; i < todos.length; i++) {
    console.log(i + 1 + '. ' + todos[i].text + ' ' + (todo[i].isComplete ? '✅' : '✖'));
  }
}

// or, with interpolation:
const displayTodosAlt2 = function() {
  console.log('\nHere are your current todos:\n')
  for (let i = 0; i < todos.length; i++) {
    console.log(`${i + 1}. ${todos[i].text} ${todo.isComplete ? '✅' : '✖'}`);
  }
}

const add = function(answer) {
  const todo = {
    text: answer,
    priority: 2,
    isComplete: false,
  }

  todos.unshift(todo);
  displayTodos();
  displayMenu();
}

const remove = function(num) {
  todos.splice(num - 1, 1);
  displayTodos();
  displayMenu();
}

const toggleComplete = function(num) {
  const todo = todos[num - 1];
  if (todo.isComplete) {
    todo.isComplete = false;
  } else {
    todo.isComplete = true;
  }

  displayTodos();
  displayMenu();
}

// Or, with a ternary:
const toggleCompleteAlt = function(num) {
  const todo = todos[num - 1];
  todo.isComplete = todo.isComplete ? false : true;

  displayTodos();
  displayMenu();
}

// or, with a bang operator:
const toggleCompleteAlt2 = function(num) {
  const todo = todos[num - 1];
  todo.isComplete = !todo.isComplete;

  displayTodos();
  displayMenu();
}

const togglePriority = function(num) {
  const todo = todos[num - 1];
  if (todo.priority === 1) {
    todo.priority = 2;
  } else if (todo.priority === 2) {
    todo.priority = 1;
  }

  displayTodos();
  displayMenu();
}

// with a ternary
const togglePriorityAlt = function(num) {
  const todo = todos[num - 1];
  todo.priority = todo.priority === 1 ? 2 : 1;

  displayTodos();
  displayMenu();
}

const removeCompletedTodos = function() {
  todos = todos.filter(function(todo) {
    return todo.isComplete === false;
  })

  displayTodos();
  displayMenu();
}

// or with a nifty one-line arrow function
const removeCompletedTodosAlt = function() {
  todos = todos.filter((todo) => todo.isComplete === false);

  displayTodos();
  displayMenu();
}

const handleMenu = function(cmd) {
  if (cmd === '1') {
    interface.question('\nWhat should go on your list? ', add)
  } else if (cmd === '2') {
    displayTodos();
    interface.question('\nPlease pick a todo to remove: ', remove)
  } else if (cmd === '3') {
    removeCompletedTodos();
  } else if (cmd === '4') {
    displayTodos();
    interface.question('\nPlease pick a todo to check complete or incomplete: ', toggleComplete)
  } else if (cmd === '5') {
    displayTodos();
    interface.question('\nPlease pick a todo to toggle its priority: ', togglePriority)
  } else {
    console.log('Quitting!');
    interface.close();
  }
}

displayTodos();
displayMenu();
