
import { _decorator, Component, Node, systemEvent, SystemEvent, Touch, EventTouch, Vec2 } from 'cc';
import { GameManager } from '../framework/GameManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = UIMain
 * DateTime = Mon Nov 15 2021 14:10:01 GMT+0800 (China Standard Time)
 * Author = mywayday
 * FileBasename = UIMain.ts
 * FileBasenameNoExtension = UIMain
 * URL = db://assets/script/ui/UIMain.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('UIMain')
export class UIMain extends Component {
    @property
    public planeSpeed = 1;

    @property(Node)
    public playerPlane: Node = null;

    @property(GameManager)
    public gameManager: GameManager = null;

    @property(Node)
    public gameStart: Node = null;
    @property(Node)
    public game: Node = null;
    @property(Node)
    public gameOver: Node = null;

    start () {
        this.node.on(SystemEvent.EventType.TOUCH_START, this._touchStart, this);
        this.node.on(SystemEvent.EventType.TOUCH_MOVE, this._touchMove, this);
        this.node.on(SystemEvent.EventType.TOUCH_END, this._touchEnd, this);

        this.gameStart.active  = true;
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    public reStart(){
        this.gameOver.active = false;
        this.game.active = true;
        this.gameManager.playAudioEffect('button');
        this.gameManager.gameReStart();
    }

    public returnMain(){
        this.gameOver.active = false;
        this.gameStart.active = true;
        this.gameManager.playAudioEffect('button');
        this.gameManager.returnMain();
    }

    _touchStart(touch: Touch, event: EventTouch){
        if (this.gameManager.isGameStart) {
            this.gameManager.isShooting(true);
        } else {
            this.gameStart.active = false;
            this.game.active = true;
            this.gameManager.playAudioEffect('button');
            this.gameManager.gameStart();
        }

    }

    _touchMove(touch: Touch, event: EventTouch){
        if (!this.gameManager.isGameStart) {
            return;
        }

        const delta = touch.getDelta();
        let pos = this.playerPlane.position;
        this.playerPlane.setPosition(pos.x + 0.01 * this.planeSpeed * delta.x, pos.y, pos.z - 0.01 * this.planeSpeed * delta.y);
    }

    _touchEnd(touch: Touch, event: EventTouch){
        if (!this.gameManager.isGameStart) {
            return;
        }

        this.gameManager.isShooting(false);
    }
}


