export class AddToDashboard{

    addedSubsContainer:HTMLDivElement

    formParent:HTMLFormElement
    submitBtn:HTMLButtonElement
    abonamentName:HTMLInputElement
    abonamentCost:HTMLInputElement
    abonamentCurrency:HTMLSelectElement
    abonamentDate:HTMLParagraphElement
    abonamentAlert:HTMLLabelElement
    flag:boolean
    flag2:boolean
    interval:number
    dateArray:number[]
    subs:any[]
    sub:object


    constructor(){

        this.addedSubsContainer = document.querySelector('.main__addedSubs')

        this.submitBtn = document.querySelector('.addSubs-form-submit')
        this.abonamentName = document.querySelector('.addSubs-form-name')
        this.abonamentCurrency = document.querySelector('.addSubs-form-currency')
        this.abonamentCost = document.querySelector('.addSubs-form-cost')
        this.abonamentDate = document.querySelector('.addSubs-form-calendar-text')
        this.abonamentAlert = document.querySelector('.addSubs-form-alert')
        this.interval

        this.dateArray = []
        this.subs = JSON.parse(localStorage.getItem('subs')) || []
        this.sub = {}

        this.addToDashboard()
        this.createSub()
    }
    

    addToDashboard(){
        this.submitBtn.addEventListener('click', () => {
            console.log(window.localStorage.getItem('subs'))
                clearInterval(this.interval)
                const errorArray = [this.abonamentName, this.abonamentCost, this.abonamentDate]
                errorArray.forEach((item:HTMLInputElement & HTMLParagraphElement) => {
                    item.value === '' ? (item.style.outline = '2px solid red', this.flag = false) : (item.style.outline = 'none')
                    item.textContent === 'date...' ? (item.parentElement.style.outline = '2px solid red', this.flag2 = false) : (item.parentElement.style.outline = 'none')
                })
                this.abonamentName.value !== '' && this.abonamentCost.value !== '' && this.abonamentDate.textContent !== 'date...' ? (
                    this.sub = {
                        name: this.abonamentName.value,
                        cost: this.abonamentCost.value,
                        time: this.abonamentDate.textContent,
                        currency: this.abonamentCurrency.value.toUpperCase(),
                        done: false
                    },
                    this.subs.push(this.sub),
                    localStorage.setItem('subs', JSON.stringify(this.subs)),
                    this.createSub(),
                    this.abonamentCost.value = '',
                    this.abonamentName.value = '',
        
                    this.abonamentDate.textContent = 'date...',
                    this.abonamentDate.style.fontWeight = '300',
                    this.abonamentDate.style.color = 'rgba(88, 88, 88, 0.5)',
                    
                    this.abonamentAlert.style.opacity = '1',
                    this.abonamentAlert.style.backgroundColor = 'green',
                    this.abonamentAlert.style.color = 'rgba(21,62,99,255)',
                    this.abonamentAlert.textContent = 'Added new substription',
                    this.interval = setInterval(() => {
                    this.abonamentAlert.style.opacity = '0'
                    }, 1500)
                ):(
                    this.abonamentDate.style.fontWeight = '300',
                    this.abonamentDate.style.color = 'rgba(88, 88, 88, 0.5)',

                    this.abonamentAlert.style.opacity = '1',
                    this.abonamentAlert.style.backgroundColor = 'red',
                    this.abonamentAlert.style.color = 'rgba(21,62,99,255)',
                    this.abonamentAlert.textContent = 'Complete the missing fields',
                    this.interval = setInterval(() => {
                    this.abonamentAlert.style.opacity = '0'
                    }, 1500)
            )
        })
    }
    createSub = () => {
        this.addedSubsContainer.innerHTML = ''
        this.subs.forEach(sub => {
            const addedSubs = document.createElement('div')
                addedSubs.classList.add('addedSubs')
            const subName = document.createElement('p')
                subName.classList.add('addedSubs-subName')
                subName.textContent = sub.name
            const subPeriod = document.createElement('p')
                subPeriod.classList.add('addedSubs-subPeriod')
            const subCost = document.createElement('p')
                subCost.classList.add('addedSubs-subCost')
                subCost.innerHTML = `${sub.cost}${sub.currency}`
            const editButton = document.createElement('button')
                editButton.classList.add('addedSubs-editBtn')
                editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`
            const deleteButton = document.createElement('button')
                deleteButton.classList.add('addedSubs-deleteBtn')
                deleteButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`

            this.addedSubsContainer.appendChild(addedSubs)
            addedSubs.appendChild(subName)
            addedSubs.appendChild(subPeriod)
            addedSubs.appendChild(subCost)
            addedSubs.appendChild(deleteButton)
            addedSubs.appendChild(editButton)

            localStorage.setItem('subs', JSON.stringify(this.subs))

            deleteButton.addEventListener('click', () => {
                this.subs = this.subs.filter(t => t != sub);
                localStorage.setItem('subs', JSON.stringify(this.subs));
                this.createSub()
            })
            editButton.addEventListener('click', () => {
                sub.done = true
                sub.time = ''
                localStorage.setItem('subs', JSON.stringify(this.subs));
                this.createSub()
            })
            if(sub.done){
                addedSubs.classList.add('edit')
                subName.style.color = 'gray'
                subCost.style.color = 'gray'
            }
            setInterval(() => {
                let actualDate:any = new Date()
                let time = (Math.floor((Date.parse(sub.time) - Date.parse(actualDate)) / (1000 * 60 * 60 * 24))) + 1
                if(time == 0 || sub.done){
                    subPeriod.style.color = 'gray'
                    subName.style.color = 'gray'
                    subCost.style.color = 'gray'
                    subPeriod.textContent = '0'
                }else if(time <= 3){
                    subPeriod.style.color = 'red'
                    subPeriod.textContent = String(time) + 'D';
                }else if(time < 10){
                    subPeriod.style.color = 'orange'
                    subPeriod.textContent = String(time) + 'D';
                }else{
                    subPeriod.style.color = 'green'
                    subPeriod.textContent = String(time) + 'D';
                }
            }, 1000)
        })
    }
}
const addToDashboard = new AddToDashboard()