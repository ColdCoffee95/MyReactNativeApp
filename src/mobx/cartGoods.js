import {observable, action, computed, autorun} from 'mobx';

class cartGoods {
    @observable
    itemData = {};

    //设置数据
    replace = (data) => {
        this.itemData = data;
    };

    @computed
    get totalNumber() {
        let total = 0;
        this.itemData.data.filter(value => value.itemSelect === 1).map(value => {
            total += value.number;
        });
        return total;
    };

    @computed
    get totalMoney() {
        let total = 0;
        this.itemData.data.filter(value => value.itemSelect === 1).map(value => {
            let emsPrice = value.emsPrice || 0
            total += value.number * value.putPrice + parseInt(emsPrice);
        });
        return total.toFixed(2);
    };

    @computed
    get isAllSelect() {
        let bool = true;
        this.itemData.data.map(value => {
            if (value.itemSelect === 0) {
                bool = false;
                return
            }
        });
        return bool;
    }

    set isAllSelect(bool) {
        let data = this.itemData.data;
        bool
            ? data.map(value => (value.itemSelect = 1))
            : data.map(value => (value.itemSelect = 0));
    }

    @action
    changeNumber(id, number) {
        this.itemData.data.find(value => value.goodsSkuId === id).number = number;
    }

    //按下的反选
    @action
    itemPress = (id) => {
        let item = this.itemData.data.find(value => value.goodsSkuId === id);
        item.itemSelect = item.itemSelect === 1 ? 0 : 1;
    };
}
export default new cartGoods();