const tabUi = document.querySelector('.tabs-ui');
const tabs = tabUi.querySelectorAll(".tab-item");
const panes = tabUi.querySelectorAll(".tab-pane");
const line = tabUi.querySelector(".tabs").querySelector(".line");
const tabActive = tabUi.querySelector(".tab-item.active");

/* Active line on first active tab */
line.style.left = tabActive.offsetLeft + 'px';
line.style.width = tabActive.offsetWidth + 'px';

/* Tabs click */
tabs.forEach((tab, index) => {
    tab.onclick = function() {
        const pane = panes[index];

        /* Unactive all active tabs + panes */
        tabUi.querySelector('.tab-item.active').classList.remove('active');
        tabUi.querySelector('.tab-pane.active').classList.remove('active');

        /* Active tab + pane when click it */
        this.classList.add('active');
        pane.classList.add('active');

        /* Active line */
        line.style.left = this.offsetLeft + 'px';
        line.style.width = this.offsetWidth + 'px';
    }
});