import { _decorator, Component, Prefab, ScrollView, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BackPackUI')
export class BackPackUI extends Component {
    @property(Prefab)
    public slotPrefab = null!;
    @property(ScrollView)
    public scrollView = null;
    @property
    public totalCount = 0;

    heroSlots : Node[];

    init (home: any) {
        this.heroSlots = []; 
        this.home = home; 
        for (let i = 0; i < this.totalCount; ++i) { 
            let heroSlot = this.addHeroSlot(); 
            this.heroSlots.push(heroSlot); 
        } 
    }

    addHeroSlot () {
        let heroSlot = instantiate(this.slotPrefab); 
        this.scrollView.content.addChild(heroSlot); 
        return heroSlot; 
    }

    show () {
        this.node.active = true; 
        this.node.emit('fade-in'); 
        this.home.toggleHomeBtns(false); 
    }

    hide () {
        this.node.emit('fade-out'); 
        this.home.toggleHomeBtns(true); 
    }
}
