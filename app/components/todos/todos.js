angular
  .module("todos", ["ngRoute"])
  .controller("todoCtrl", TodoController)
  .config(config);

function TodoController($scope){
  $scope.example = "another todo";
}

function config($routeProvider){
  $routeProvider.when("/", {
    templateUrl: "/components/todos/todoView.html"
  });
}