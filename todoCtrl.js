todoApp.controller("todoCtrl", function($scope, todoService) {
  $scope.newToDo = "";
  //console.log("in todoCtrl");
  $scope.todosList = [];
  $scope.undoneCounter = 0;

  $scope.addTodo = function(name, state) {
    if (name !== "") {
      $scope.todosList = todoService.addToDoItem($scope.newToDo, state)
      $scope.newToDo = "";
      $scope.undoneCounter = todoService.getCompletedNum();
    }
  }

  $scope.setChecked = function(item, newstate) {
    //alert(name + " " + state);
    todoService.changeToDoState(item, newstate);
    $scope.undoneCounter = todoService.getCompletedNum();

    var todoEl = angular.element(document.querySelector("#label-" + item.name));
    if (newstate) {
      todoEl.addClass('checked');
      // $scope.undoneCounter--;
    } else {
      todoEl.removeClass('checked');
      // $scope.undoneCounter++;
    }

  }

  $scope.removeTodo = function(name, state, wasDone) {
    if (state === false) {
      var todoEl = angular.element(document.querySelector("#popup-" + name));
      todoEl.removeClass("d-none");
    } else {
      todoService.delToDoItem(name);
      $scope.undoneCounter = todoService.getCompletedNum();
      // if (!wasDone)
      //     $scope.undoneCounter--;
    }
  }

  $scope.SetPopUpDidplayNone = function(name) {
    var todoEl = angular.element(document.querySelector("#popup-" + name));
    todoEl.addClass("d-none");
  }

  var showArr = [];

  $scope.showChecked = function(checked) {
    var completeArr = todoService.getToDoList();
    showArr.length = 0;

    if (checked === undefined) {
      showArr = angular.copy(completeArr);
      // $scope.todosList = showArr;
    } else {
      for (var i = 0; i < completeArr.length; i++) {
        if (completeArr[i].state) {
          if (checked)
            showArr.push(completeArr[i]);
        } else {
          if (!checked)
            showArr.push(completeArr[i]);
        }
      }
    }
    for (var i = 0; i < showArr.length; i++) {
      if (showArr[i].state) {
        var todoEl = angular.element(document.querySelector("#input-" + name));
        todoEl.addClass("checked");
        todoEl.checked = true;
      }
    }
    $scope.todosList = showArr;
  }
});