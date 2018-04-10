import {observable, action, computed, autorun} from 'mobx';

export default class selectPayTypeCountdown {
    @observable
    time = {};

    //设置数据
    replace = (data) => {
        this.time = data;
    };

    @computed
    get hours() {
        return parseInt(this.time / 3600);
    };

    @computed
    get minutes() {
        return parseInt((this.time - this.hours * 3600) / 60);
    };

    @computed
    get seconds() {
        return this.time % 60;
    }


}