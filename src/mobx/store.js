import { observable, computed, action } from 'mobx'
import cartGoods from './cartGoods'
import selectPayTypeCountdown from './selectPayTypeCountdown'
class RootStore{
    constructor(){
        this.CartStore = new CartStore(cartGoods,this)
        this.selectPayTypeCountdown = new selectPayTypeCountdown(selectPayTypeCountdown,this)
    }
}
