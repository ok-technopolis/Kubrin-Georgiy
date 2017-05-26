(function () {
    var extendConstructor = TODO_APP.utils.extendConstructor;
    var getTextNode = TODO_APP.utils.getTextNode;
    var Eventable = TODO_APP.modules.Eventable;
    var l10n = TODO_APP.modules.l10n;
    var Filter = TODO_APP.components.Filter;

    /**
     * @constructor
     * @implements {EventListener}
     */
    function TodoActionsBarConstructor() {
        console.log("action bar constr");
        this._initEventable();

        this._counterNode = document.querySelector('.js-todos-actions-bar_counter');
        this._counterNodeText = getTextNode(this._counterNode);
        this._clearCompletedNode = document.querySelector('.js-todos-actions-bar_clear-completed');

        this._clearCompletedNode.addEventListener('click', this);

        this._filters = new Filter(document.querySelector('.js-todos-actions-bar_filter'));

        this._filters.on('filterSelected', this._onFilterSelected, this);
    }

    extendConstructor(TodoActionsBarConstructor, Eventable);

    var todoActionsBarConstructorPrototype = TodoActionsBarConstructor.prototype;

    todoActionsBarConstructorPrototype._onFilterSelected = function (filterId) {
        this.trigger('filterSelected', filterId);
    };

    /**
     * @return {TodoActionsBarConstructor}
     * @private
     */
    todoActionsBarConstructorPrototype._clearCompleted = function () {
        this.trigger('clearCompleted');
        return this;
    };

    /**
     * @param {Number} count
     * @return {TodoActionsBarConstructor}
     */
    todoActionsBarConstructorPrototype.setItemsCount = function (count) {
        this._counterNodeText.nodeValue = count + ' ' + l10n.plural('todosCountLabel', count);
        return this;
    };

    /**
     * @param {Event} e
     */
    todoActionsBarConstructorPrototype.handleEvent = function (e) {
        switch (e.type) {
            case 'click':
                this._clearCompleted();
                break;
        }
    };

    TODO_APP.components.TodoActionsBar = TodoActionsBarConstructor;
}());