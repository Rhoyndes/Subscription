export class ChangeSide {
    constructor() {
        this.dashboard = document.querySelector('.header-menu__item-dashboard');
        this.addSub = document.querySelector('.header-menu__item-addSub');
        this.card = document.querySelector('.cardWrapper');
        this.flag = false;
        this.changeSide();
    }
    changeSide() {
        this.dashboard.addEventListener('click', () => this.flag && (this.card.style.transform = 'rotateX(0deg)', this.flag = !this.flag));
        this.addSub.addEventListener('click', () => !this.flag && (this.card.style.transform = 'rotateX(180deg)', this.flag = !this.flag));
    }
}
const changeSide = new ChangeSide();
