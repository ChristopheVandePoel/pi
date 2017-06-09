import pi from './lib/pi';

export default class Main {
    private digits: number = 1;
    private maxNumber: number = 0;
    private startTime: number = 0;
    constructor() {
        console.log('Typescript Webpack starter launched, again!');
        this.eventHandlers();
    }

    private eventHandlers() {
        var selectDigit  = document.getElementById("select-digits") as HTMLSelectElement;
        var clickSearch  = document.getElementById("search-ids");
        var stopSearch = document.getElementById("stop");
        selectDigit.addEventListener("change", (id: Event) => {
            this.digits = parseInt(selectDigit.options[selectDigit.selectedIndex].value, 10);
        });

        clickSearch.addEventListener('click', () => {
            this.searchDigits(this.digits);
        })
    }

    private setDigit(digit: number) {
        this.digits = digit;
    }

    private searchDigits(digits) {
        this.startTime = Date.now();
        document.getElementById("progress").style.display = 'block';
        console.log("searching...", pi);

        for(let i = 0 ; i < 10**digits ; i++) {
            //console.log("getting", i);
            let searchPos =  pi.search(this.pad(digits, i));
            if( searchPos > -1 ) {
                if( this.maxNumber < searchPos) {
                    this.maxNumber = searchPos;
                    console.log('new max number!', this.maxNumber);
                }
            } else {
                //console.warn('integer not found:', this.pad(digits, i));
            }
        }
        console.log(`done, took ${Date.now() - this.startTime} ms`);
    }

    private pad(n: number, p: number): string {
        let pad = '000000000000000';
        let numberLength = p.toString(10).length;
        if (numberLength === n) return p.toString(10);
        return pad.substr(0, n-numberLength) + p.toString(10);
    }

}

let start = new Main();