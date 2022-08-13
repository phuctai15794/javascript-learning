import html from '../core/core.js';
import Header from '../components/Header.js';
import TodoLists from '../components/TodoLists.js';
import Footer from '../components/Footer.js';

function App() {
    return html`
        <section class="todoapp">
            ${Header()}
            ${TodoLists()}
            ${Footer()}
        </section>
    `;
}

export default App;