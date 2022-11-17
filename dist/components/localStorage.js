export class LocalStorage {
    constructor() {
        this.addedSubsContainer = document.querySelector('.main__addedSubs');
        this.submitBtn = document.querySelector('.addSubs-form-submit');
        this.storage();
    }
    storage() {
        this.submitBtn.addEventListener('click', () => {
            window.localStorage.setItem('subs', this.addedSubsContainer.innerHTML);
        });
        this.addedSubsContainer.innerHTML = window.localStorage.getItem('subs');
    }
}
const storage = new LocalStorage();
