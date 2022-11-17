export class BrowserCheck{

    alert: HTMLDivElement
    app: HTMLDivElement
    browser: string

    constructor(){

        this.alert = document.querySelector('.browser')
        this.app = document.querySelector('.subApp')

        this.browser = navigator.userAgent
        this.check()
    }
    check(){
        let safariAgent = this.browser.indexOf("Safari") > -1;

        if(safariAgent){
            this.alert.style.display = 'grid'
            this.app.style.display = 'none'
        }else{
            this.alert.style.display = 'none'
            this.app.style.display = 'block'
        }
    }
}

const browserCheck = new BrowserCheck()