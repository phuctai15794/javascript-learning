import storeage from "../core/storage.js";

const init = {
    todos: storeage.get(),
    editIndex: null,
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed
    }
}

const actions = {
    add({ todos }, title) {
        if(title) {
            todos.push({
                title,
                completed: false
            });
            storeage.set(todos);
        }
    },
    destroy({ todos }, index) {
        if(todos[index]) {
            todos.splice(index, 1);
            storeage.set(todos);
        }
    },
    toggle({ todos }, index) {
        if(index >= 0) {
            const todo = todos[index];
            todo.completed = !todo.completed;
            storeage.set(todos);
        }
    },
    toggleAll({ todos }, completed) {
        todos.forEach(todo => todo.completed = completed);
        storeage.set(todos);
    },
    switchFilter(state, type) {
        if(type && Object.keys(state.filters).includes(type)) {
            state.filter = type;
        }
    },
    clearCompleted(state) {
        state.todos = state.todos.filter(state.filters.active);
        storeage.set(state.todos);
    },
    startEdit(state, index) {
        if(index >= 0) {
            state.editIndex = index;
        }
    },
    endEdit(state, title) {
        if(state.editIndex !== null) {
            if(title) {
                state.todos[state.editIndex].title = title;
                storeage.set(state.todos);
            } else {
                this.destroy(state, state.editIndex);
            }

            state.editIndex = null;
        }
    },
    cancelEdit(state) {
        state.editIndex = null;
    }
}

export default function reducer(state = init, action, args) {
    actions[action] && actions[action](state, ...args);
    return state;
}