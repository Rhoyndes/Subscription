export class MenuAddedItem {
    constructor(subs, sub, createSub) {
        this.addedSubsContainer = document.querySelector('.main__addedSubs');
        this.deleteBtn = [...document.querySelectorAll('.addedSubs-deleteBtn')];
        this.editBtn = [...document.querySelectorAll('.addedSubs-editBtn')];
        this.action();
        this.subs = subs;
        this.sub = sub;
        this.createSub = createSub;
    }
    action() {
        this.deleteBtn.forEach(item => {
            item.addEventListener('click', e => {
                this.subs.filter(sub => {
                    console.log(sub);
                    console.log(e.target);
                    sub != this.sub;
                });
                localStorage.setItem('subs', JSON.stringify(this.subs));
                this.createSub();
            });
        });
        this.editBtn.forEach(item => {
            item.addEventListener('click', e => {
                const target = e.target;
                target.parentElement.parentElement.style.textDecoration = 'line-through';
            });
        });
    }
}
