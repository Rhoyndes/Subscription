export class Timer {
    constructor(date) {
        this.time = [...document.querySelectorAll('.addedSubs-subPeriod')];
        this.dateArray = [];
        this.date = date;
        this.timer();
    }
    timer() {
        this.dateArray.push(this.date);
        console.log(this.dateArray);
        this.time.forEach((clock, id) => {
            setTimeout(() => {
                setInterval(() => {
                    // this.dateArray[id]--
                    clock.textContent = this.dateArray[id];
                }, 1000);
            });
        });
    }
}
