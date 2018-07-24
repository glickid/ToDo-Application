todoApp.factory("todoService", function ($log, $timeout) {

  function TodoItem(name, state) {
    this.name = name;
    this.state = state;
  }

  var todoArr = [];
  var completedItems = 0;

  function addToDoItem(name, state) {
    var todo = new TodoItem(name, state);
    todoArr.push(todo);

    if (state)
      completedItems++;

    return todoArr;
  }

  function findItemByName(name) {
    var i = 0;
    for (; i < todoArr.length; i++) {
      if (name === todoArr[i].name)
        break;
    }

    if (i < todoArr.length)
      return i;
    else
      return (-1);
  }

  function delToDoItem(name) {
    var index = findItemByName(name);

    if (index != -1) {
      if (todoArr[index].state)
        completedItems--;
      todoArr.splice(index, 1);
    }
  }

  function changeToDoState(item, newstate) {
    if (newstate === undefined)
      return;

    var index = todoArr.indexOf(item);

    if ((todoArr[index].state === false) && (newstate))
      completedItems++;
    if ((todoArr[index].state) && (newstate  === false))
      completedItems--;
    todoArr[index].state = newstate;
  }

  function getToDoItem(name) {
    var index = findItemByName(name);

    if (index != -1)
      return todoArr[index];
    else
      return {};
  }

  function getToDoList() {
    return todoArr;
  }

  function getCompletedNum() {
    return completedItems;
  }

  return {
    addToDoItem: addToDoItem,
    getToDoItem: getToDoItem,
    delToDoItem: delToDoItem,
    changeToDoState: changeToDoState,
    getToDoList: getToDoList,
    getCompletedNum: getCompletedNum
  }
})