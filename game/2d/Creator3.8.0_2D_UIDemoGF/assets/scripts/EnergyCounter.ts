import { _decorator, Component, Label, ProgressBar } from "cc";
const { ccclass, property } = _decorator;

@ccclass
export class EnergyCounter extends Component{
    @property
    public timeToRecover = 0;
    @property
    public totalCount = 0;
    @property
    public currentCount = 0;
    @property({
        type: Label
    })
    labelTimer: Label = null!;
    @property({
        type: Label
    })
    labelCount: Label = null!;
    @property({
        type: ProgressBar
    })
    progressBar: ProgressBar = null!;

    private _timer = 0;

    onLoad() {
        this._timer = 0;
    }

    update(dt: number) {
        let ratio = this._timer / this.timeToRecover;
        this.progressBar.progress = ratio;
        if (this.currentCount > this.totalCount) this.currentCount = this.totalCount;
        let timeLeft = Math.floor(this.timeToRecover - this._timer);
        this.labelCount.string = this.currentCount + '/' + this.totalCount;
        this.labelTimer.string = Math.floor(timeLeft / 60).toString() + ':' + (timeLeft % 60 < 10 ? '0' : '') + timeLeft % 60;
        this._timer += dt;
        if (this._timer >= this.timeToRecover) {
            this._timer = 0;
            this.currentCount++;
        }
    }
}
