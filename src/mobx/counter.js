import {observable, action, computed, autorun} from 'mobx';

export default class cartGoods {
    @observable currentValue = 0;
    @observable steps = 0;
    @observable min = 0;
    @observable max = 0;
    @observable sellout = 0;
    //设置数据
    replace = (data) => {
        let {currentValue,steps,min,max,sellout} = data;
        this.currentValue = currentValue;
        this.steps = steps;
        this.min = min;
        this.max = max;
        this.sellout = sellout;
    };


}