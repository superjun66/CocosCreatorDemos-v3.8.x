
import { _decorator, Component, Sprite, Node, Animation } from "cc";
const { ccclass, property } = _decorator;
import { HomeUI } from "./HomeUI";
import { ChargeUI } from "./ChargeUI";
import { PanelType } from "./PanelType";

@ccclass
export class ShopUI extends Component {
    @property(Animation)
    public anim: Animation = null!;
    @property(Sprite)
    public figure: Sprite = null!;
    @property(Node)
    public btnsNode: Node = null!;
    @property(ChargeUI)
    public chargeUI: ChargeUI = null!;

    private _panelType = PanelType.Home;
    private _home: HomeUI = null!;

    // use this for initialization
    init(home: HomeUI, panelType: PanelType) {
        this._home = home;
        this.node.active = false;
        this.anim.play('shop_reset');
        this._panelType = panelType;
        this.chargeUI.init(home, this.btnsNode);
    }

    show() {
        this.node.active = true;
        this.anim.play('shop_intro');
    }

    hide() {
        this.anim.play('shop_outro');
    }

    onFinishShow() {
        this._home.curPanel = this._panelType;
    }

    onFinishHide() {
        this.node.active = false;
    }
}
