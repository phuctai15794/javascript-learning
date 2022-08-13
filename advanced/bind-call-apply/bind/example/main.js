const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = (() => {
    const cars = ['BMW'];
    const lists = $('#lists');
    const name = $('#name');
    const add = $('#add');

    return {
        add(car) {
            cars.push(car);
        },
        delete(index) {
            cars.splice(index, 1);
        },
        render() {
            const htmls = cars.map((car, index) => `
                <li id="${index}">
                    ${car}
                    <span class="delete" data-index="${index}" style="cursor:pointer">&times</span>
                </li>
            `).join('');
            lists.innerHTML = htmls;
        },
        handleDelete(e) {
            // Delegate: Handle with lists cars when click on it
            const deleteNode = e.target.closest('.delete');
            
            if(deleteNode) {
                const index = deleteNode.dataset.index;
                this.delete(index);
                this.render();
            }
        },
        init() {
            // Handle DOM event
            add.onclick = () => {
                var carName = name.value;

                if(carName) {
                    const car = name.value;
                    this.add(car);
                    this.render();
                    
                    name.value = '';
                    name.focus();
                } else {
                    name.focus();
                    alert('Vui lòng nhập tên xe');
                }
            };

            // Handle delete
            lists.onclick = this.handleDelete.bind(this);

            // Render
            this.render();
        }
    }
})();

app.init();