import html from '../core/core.js';
import { connect } from '../core/store.js';
import TodoItem from '../components/TodoItem.js';

function TodoLists({ todos, filter, filters }) {
    return html`
        <section class="main">
            <input 
                id="toggle-all" 
                class="toggle-all" 
                type="checkbox"
                onchange="dispatch('toggleAll', this.checked)"
                ${todos.every(filters.completed) && 'checked'}
            >
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                ${
                    todos
                    .filter(filters[filter])
                    .map((todo, index) => 
                        TodoItem({ todo, index })
                    )
                }
            </ul>
        </section>
    `;
}

export default connect()(TodoLists);