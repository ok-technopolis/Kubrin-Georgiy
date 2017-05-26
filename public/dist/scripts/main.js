(function () {

    var l10n = TODO_APP.modules.l10n;

    var TodoMain = TODO_APP.components.TodoMain;
    var AddTodos = TODO_APP.components.AddTodos;
    var TodoList = TODO_APP.components.TodoList;
    var TodoActionsBar = TODO_APP.components.TodoActionsBar;

    function init() {
        console.log("init()");
        var rusDictionary = {
            'todosCountLabel': ['задача', 'задачи', 'задач']
        };
        l10n.provideDict('ru', rusDictionary);
        
        console.log("main new");
        var todoMain = new TodoMain();
        console.log("add new");
        var addTodos = new AddTodos();
        console.log("list new");
        var todoList = new TodoList();
        console.log("actions bar new");
        var todoActionsBar = new TodoActionsBar();


        addTodos
            .on('newTodo',
                function (todoData) { todoList.createItem(todoData); }
            )
            .on('markAsReadyAll',
                function () { todoList.markAsReadyAll();}
            );

        function itemsCountWatcher () {
            var itemsCount = todoList.getItemsCount();

            if (itemsCount !== 0) {
                todoMain.showFullInterface();
            }

            todoActionsBar.setItemsCount(itemsCount);
        }

        todoList.on('itemAdd', itemsCountWatcher)
            .on('itemDelete', itemsCountWatcher);

        todoActionsBar.on(
            'clearCompleted',
            function () { todoList.removeCompletedItems(); }
        );

        todoActionsBar.on('filterSelected', function (filterId) {
            todoList.setFilter(filterId);
        });

    }

    document.addEventListener('DOMContentLoaded', init);
}());