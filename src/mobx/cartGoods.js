import {observable, action, computed, autorun} from 'mobx';

export default class cartGoods {
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
    get totalMoney1() {
        let total = 0;
        this.itemData.data.filter(value => value.itemSelect === 1).map(value => {
            let emsPrice = value.emsPrice || 0
            total += value.number * value.putPrice + parseInt(emsPrice);
        });
        return total;
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
        // let i = 0;
        // this.itemData.data.filter(value => value.itemSelect === 0).map((value) => {
        //     i += 1;
        // });
        // if (i === 0) {
        //     this.itemData.isAllSelect = true;
        // }
        // else {
        //     this.itemData.isAllSelect = false;
        // }
    };
    // //加
    // @action
    // increase = (money, number) => {
    //     this.itemData.totalMoney += money;
    //     this.itemData.totalNum += number;
    // };
    //
    // //减
    // @action
    // reduce = (money, number) => {
    //     this.itemData.totalMoney -= money;
    //     this.itemData.totalNum -= number;
    // };


    //全选
    // @action
    // selectAll = () => {
    //     this.itemData.isAllSelect = !this.itemData.isAllSelect;
    //     this.itemData.totalNum = 0;
    //     this.itemData.totalMoney = 0;
    //     if (this.itemData.isAllSelect) {
    //         this.itemData.data.map(value => {
    //             value.itemSelect = 1;
    //             let emsPrice = value.emsPrice || 0;
    //             this.itemData.totalMoney += value.number * value.putPrice + parseInt(emsPrice);
    //             this.itemData.totalNum += value.number;
    //         });
    //     } else {
    //         this.itemData.data.map(value => {
    //             value.itemSelect = 0;
    //         });
    //     }
    // }
}