export class Calendar {
    form:HTMLFormElement

    calendarTable:HTMLDivElement
    monthName:HTMLHeadingElement
    year:HTMLHeadingElement

    calendar:HTMLDivElement
    calendarOpen:HTMLElement
    calendarClose:HTMLElement

    selectedDate:HTMLParagraphElement

    leftButton:HTMLButtonElement
    rightButton:HTMLButtonElement

    date:Date
    result:number
    calendarYear:number
    actualDay:number
    actualMonth:number
    actualYear:number

    months:string[]
    february:number
    amountDays:number[]
    constructor(){
        this.form = document.querySelector('.addSubs-form')

        this.calendarTable = document.querySelector('.calendarApp__table')
        this.monthName = document.querySelector('.calendarApp__header-month')
        this.year = document.querySelector('.calendarApp__header-year')

        this.calendar = document.querySelector('.addSubs-form-calendarApp')
        this.calendarOpen = document.querySelector('.addSubs-form-calendar-icon')
        this.calendarClose = document.querySelector('.calendarApp__cancelBtn-icon')

        this.selectedDate = document.querySelector('.addSubs-form-calendar-text')

        this.leftButton = document.querySelector('.calendarApp__header-button-left')
        this.rightButton = document.querySelector('.calendarApp__header-button-right')

        this.date = new Date
        this.result = this.date.getMonth()
        this.calendarYear = this.date.getFullYear()
        this.actualDay = this.date.getDate()
        this.actualMonth = this.date.getMonth()
        this.actualYear = this.date.getFullYear()

        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December']
        this.february = 28
        this.amountDays = [31,this.february,31,30,31,30,31,31,30,31,30,31]
        this.init()
    }
    init(){
        this.actualeDate()
        this.addEventListener()
    }
    addEventListener = () => {
        this.form.addEventListener('submit', e => {
            e.preventDefault()
        })
        this.leftButton.addEventListener('click', () => {
            this.result--
            this.result < 0 && (this.result = 11, this.calendarYear--)
            this.actualeDate()
        })
        this.rightButton.addEventListener('click', () => {
            this.result++
            this.result > 11 && (this.result = 0, this.calendarYear++)
            this.actualeDate()
        })
        this.calendarOpen.addEventListener('click', () => this.calendar.style.left = '0%')
        this.calendarClose.addEventListener('click', () => {
            this.calendar.style.left = '-100%'
            this.result = this.date.getMonth()
            this.actualeDate()
        })

    }
    actualeDate = () => {
        this.getMonthName()
        this.getYear()
        this.getDays()
    }
    getMonthName = () => {
        this.monthName.textContent = this.months[this.result]
    }
    getYear = () => {
        Number(this.year.textContent) % 4 === 0 ?  this.february = 29 : this.february = 28
        this.amountDays = [31,this.february,31,30,31,30,31,31,30,31,30,31]
        this.year.textContent = String(this.calendarYear)
    }
    getDays = () => {
        this.calendarTable.innerHTML = ''
        for(let i = 0; i < this.amountDays[this.result]; i++){
            this.calendarTable.innerHTML += `<div class='calendarApp__table-day'>${i+1}</div>`
        }
        const days = [...this.calendarTable.querySelectorAll<HTMLElement>('.calendarApp__table-day')]
        days.forEach( day => {
            if(this.monthName.textContent === this.months[this.actualMonth] && String(this.actualYear) === this.year.textContent){
                Number(day.textContent) === this.actualDay && (day.style.color = 'white'),
                this.leftButton.style.pointerEvents = 'none' 
            }else{
                this.leftButton.style.pointerEvents = 'all' 
            }
            day.addEventListener('click', e => {
                const target = e.target as HTMLElement
                if(this.actualMonth === this.result && this.actualDay > Number(target.textContent) && this.actualYear === Number(this.year.textContent)){
                    return alert('Please select a current or future date')
                }
                this.selectedDate.textContent = `${this.monthName.textContent} ${target.textContent}, ${this.year.textContent}`
                this.selectedDate.style.color = 'rgba(21,62,99,255)'
                this.selectedDate.style.fontWeight = 'bold'
                this.calendar.style.left = '-100%'
                this.result = this.date.getMonth()
                this.calendarYear = this.actualYear
                this.actualeDate()
            })
    })
    }
}
const calendar = new Calendar()