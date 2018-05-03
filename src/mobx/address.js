import {observable, action, computed} from 'mobx';

class address {
    @observable addressData = [];
    @observable provinceId = '';
    @observable cityId = '';
    @observable areaId = '';
    @observable provinceName = '';
    @observable cityName = '';
    @observable areaName = '';
    //设置数据
    replace = (data) => {
        this.addressData = data;
    };

    @computed
    get provinceList() {
        console.warn('computedprovince')
        let arr = [];
        this.addressData.filter(value => !value.parent).map(value => {
            arr.push(value)
        });
        return arr;
    };

    @computed
    get cityList() {
        let arr = [];
        this.addressData.filter(value => value.parent == this.provinceId).map(value => {
            arr.push(value)
        });
        return arr;
    };

    @computed
    get areaList() {
        let arr = [];
        this.addressData.filter(value => value.parent == this.cityId).map(value => {
            arr.push(value)
        });
        return arr;
    }

    @action
    changeProvince(id) {
        console.warn('changeProvince',id)
        this.provinceId = id;
        setTimeout(()=>{
            this.changeCity(this.cityList[0].value)
        },10)
    }

    @action
    changeCity(id) {
        this.cityId = id;
        setTimeout(()=>{
            this.changeArea(this.areaList[0].value)
        },10)
    }

    @action
    changeArea(id) {
        this.areaId = id;
    }

}
export default new address()