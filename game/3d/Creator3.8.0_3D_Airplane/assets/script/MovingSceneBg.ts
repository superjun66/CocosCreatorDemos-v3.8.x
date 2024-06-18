
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = MovingSceneBg
 * DateTime = Tue Nov 09 2021 17:43:06 GMT+0800 (China Standard Time)
 * Author = mywayday
 * FileBasename = MovingSceneBg.ts
 * FileBasenameNoExtension = MovingSceneBg
 * URL = db://assets/MovingSceneBg.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('MovingSceneBg')
export class MovingSceneBg extends Component {
    @property(Node)
    bg01: Node = null;

    @property(Node)
    bg02: Node = null;

    private _bgSpeed = 10;
    private _bgMovingRange = 90;

    start () {
       this._init();
    }

    update (deltaTime: number) {
        this._moveBackground(deltaTime)
    }

    private _init(){
        this.bg01.setPosition(0, 0, 0);
        this.bg02.setPosition(0, 0, -this._bgMovingRange);
    }

    private _moveBackground(deltaTime: number){
        this.bg01.setPosition(0, 0, this.bg01.position.z + this._bgSpeed * deltaTime);
        this.bg02.setPosition(0, 0, this.bg02.position.z + this._bgSpeed * deltaTime);

        if (this.bg01.position.z > this._bgMovingRange) {
            this.bg01.setPosition(0, 0, this.bg02.position.z - this._bgMovingRange);
        } else if (this.bg02.position.z > this._bgMovingRange) {
            this.bg02.setPosition(0, 0, this.bg01.position.z - this._bgMovingRange);
        }
    }
}


