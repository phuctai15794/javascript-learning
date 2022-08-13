const TODOS_STOREAGE_KEY = 'TODOS';

export default {
    get() {
        return JSON.parse(localStorage.getItem(TODOS_STOREAGE_KEY)) || []
    },
    set(todos) {
        localStorage.setItem(TODOS_STOREAGE_KEY, JSON.stringify(todos))
    }
}