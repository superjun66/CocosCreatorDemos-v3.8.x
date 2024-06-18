
import { _decorator, Component, Node, Collider, ITriggerEvent } from 'cc';
import { Constant } from '../framework/Constant';
import { PoolManager } from '../framework/PoolManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Bullet
 * DateTime = Mon Nov 15 2021 14:58:43 GMT+0800 (China Standard Time)
 * Author = mywayday
 * FileBasename = Bullet.ts
 * FileBasenameNoExtension = Bullet
 * URL = db://assets/script/bullet/Bullet.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('Bullet')
export class Bullet extends Component {
    private _bulletSpeed = 0;
    private _direction = Constant.Direction.MIDDLE;
    private _isEnemyBullet = false;

    onEnable () {
        const collider = this.getComponent(Collider);
        collider.on('onTriggerEnter', this._onTriggerEnter, this);
    }

    onDisable () {
        const collider = this.getComponent(Collider);
        collider.off('onTriggerEnter', this._onTriggerEnter, this);
    }

    update (deltaTime: number) {
        const pos = this.node.position;
        let moveLength = 0;
        if (this._isEnemyBullet) {
            moveLength = pos.z + this._bulletSpeed;
            this.node.setPosition(pos.x, pos.y, moveLength);
            if (moveLength > 50) {
                // this.node.destroy();
                PoolManager.instance().putNode(this.node);
                // console.log('bullet destroy');
            }
        } else {
            moveLength = pos.z - this._bulletSpeed;
            if(this._direction === Constant.Direction.LEFT){
                this.node.setPosition(pos.x - this._bulletSpeed * 0.2, pos.y, moveLength);
            } else if(this._direction === Constant.Direction.RIGHT){
                this.node.setPosition(pos.x + this._bulletSpeed * 0.2, pos.y, moveLength);
            } else{
                this.node.setPosition(pos.x, pos.y, moveLength);
            }

            if (moveLength < -50) {
                // this.node.destroy();
                PoolManager.instance().putNode(this.node);
                // console.log('bullet destroy');
            }
        }
    }

    show(speed: number, isEnemyBullet: boolean, direction = Constant.Direction.MIDDLE){
        this._bulletSpeed = speed;
        this._isEnemyBullet = isEnemyBullet;
        this._direction = direction;
    }

    private _onTriggerEnter(event: ITriggerEvent){
        // console.log('trigger  bullet destroy');
        // this.node.destroy();
        PoolManager.instance().putNode(this.node);
    }
}


