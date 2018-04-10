import {NavigationActions} from 'react-navigation'
import HttpUtils from "./http";

global.jumpAndClear = function (navigation, route) {
    resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName: route})//要跳转到的页面名字
        ]
    });
    navigation.dispatch(resetAction);
};
global.getAddressData = function () {
    return new Promise((resolve, reject) => {
        storage.load({key: 'addressData'}).then(res => {
            resolve(res);
        }).catch(e => {
            if (e.name == 'NotFoundError') {
                try {
                    HttpUtils.get('/region/selectRegionList', {}, data => {
                        let list = data.data.list;
                        console.warn(list)
                        storage.save({
                            key: 'addressData',
                            data: list,
                        });
                        resolve(list)
                    });
                } catch (e) {
                    resolve([]);
                    alert('地址数据获取失败,请稍后再试')
                }
            }
        })
    })
};

global.getTotalAddress = async function (addressData, dataArr) {//数据数组
    return new Promise((resolve, reject) => {
        try {
            dataArr.map(item => {
                let provinceName = addressData.find(value => value.value == item.provinceId).name;
                let cityName = addressData.find(value => value.value == item.cityId).name;
                let areaName = addressData.find(value => value.value == item.areaId).name;
                item.totalAddress = provinceName + cityName + areaName + item.address;
            });
            resolve(dataArr)
        } catch (e) {
            console.warn(e);
            resolve([]);
            alert('地址解析出错,请稍后再试');
        }

    })

};