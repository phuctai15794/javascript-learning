import html from '../core/core.js';
import { connect } from '../core/store.js';

function TodoItem({ todo, index, editIndex }) {
    return html`
        <li class="
                ${todo.completed && 'completed'} 
                ${editIndex === index && 'editing'}
            ">
            <div class="view">
                <input 
                    class="toggle" 
                    type="checkbox" 
                    ${todo.completed && 'checked'}
                    onchange="dispatch('toggle', ${index})"
                >
                <label ondblclick="dispatch('startEdit', ${index})">${todo.title}</label>
                <button class="destroy" onclick="dispatch('destroy', ${index})"></button>
            </div>
            <input 
                class="edit" 
                onkeyup="
                    event.keyCode === 13 && 
                    dispatch('endEdit', this.value.trim()) ||
                    event.keyCode === 27 && 
                    dispatch('cancelEdit')"
                onblur="dispatch('endEdit', this.value.trim())"
                value="${todo.title}">
        </li>
    `;
}

export default connect()(TodoItem);