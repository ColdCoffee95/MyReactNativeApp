import { observable, computed, action } from 'mobx'
import cartGoods from './cartGoods'
class RootStore{
    constructor(){
        this.CartStore = new CartStore(cartGoods,this)
    }
}
class CartStore{

}