export default class Main {
    private digits: number = 1;
    private maxNumber: number = 0;
    private startTime: number = 0;
    private intervalStart: number = 0;
    private lastFourIntervals: number[] = [];
    private intervalShow: number = 1000;

    public searchDigits(digits, pi) {
        this.startTime = Date.now();
        this.intervalStart = this.startTime;
        // document.getElementById("progress").style.display = 'block';
        console.log("searching...");
        let alldigits = 10**digits;
        for(let i = 0 ; i < alldigits ; i++) {
            if(i % this.intervalShow === 0 && i !== 0) {
                // some nice info
                this.renderNiceInfo(i, alldigits);
            }
            //console.log("getting", i);
            let padded = this.pad(digits, i);
            let searchPos =  pi.indexOf(padded);
            //let searchPos =  (new RegExp(padded)).test(pi);
            if( searchPos > -1 ) {
                if( this.maxNumber < searchPos) {
                    this.maxNumber = searchPos;
                    console.log(`new max index! ${this.maxNumber} for number ${padded}`);
                }
            } else {
                console.warn('integer not found:', padded);
                break;
            }
        }
        console.log(`done, took ${Date.now() - this.startTime} ms, max indice: ${this.maxNumber}`);
    }

    private getTimeLeft(total: number, part: number, timebetween: number): string {
        let totalMs = Math.round((total / part) * timebetween);
        let totalSec = Math.round(((this.startTime + totalMs) - Date.now())/1000);
        let totalMin = Math.round(totalSec/60);
        let totalHr = Math.round(totalMin/60);
        let totalType = `${totalHr}h ${totalMin % 60}m ${totalSec % 60}s`
        return totalType;
    }

    private renderNiceInfo(i, alldigits) {
        let interval = Date.now() - this.intervalStart;
        let total = Date.now() - this.startTime;
        this.intervalStart = Date.now();
        this.lastFourIntervals.push(interval);
        if (this.lastFourIntervals.length > 4) this.lastFourIntervals.shift();
        let timebetween = this.calcAverage(this.lastFourIntervals);
        let timeleft = this.getTimeLeft(alldigits, this.intervalShow, timebetween);
        console.log(`${i} calculations, ${interval}ms since last. ${total}ms since start, ${timeleft} left`);
        console.log('Highest needed index, for now: ', this.maxNumber);
    }

    private pad(n: number, p: number): string {
        let pad = '000000000000000';
        let numberLength = p.toString(10).length;
        if (numberLength === n) return p.toString(10);
        return pad.substr(0, n-numberLength) + p.toString(10);
    }

    private calcAverage(numbers: number[]): number {
        let result = 0;
        for(let i = 0; i < numbers.length; i++){
            result  = result + numbers[i];
        }
        return Math.round(result/numbers.length);
    }
}