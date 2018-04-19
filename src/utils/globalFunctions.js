import {NavigationActions} from 'react-navigation'
import HttpUtils from "./http";
import {
    Alert,
} from 'react-native';
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
                    Alert.alert(null,'地址数据获取失败,请稍后再试')
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
            Alert.alert(null,'地址解析出错,请稍后再试');
        }

    })

};
global.validPwd = function (str) {
    if (str.length < 6 || str.length > 20) {
        return false
    }
    if (/[^a-zA-Z0-9_]/.test(str)) {
        return false
    }
    if (/(^[a-z]+$|^[A-Z]+$|^\d+$|^_+$)/.test(str)) {
        return false
    }
    return true
};
global.dateFormat = function (timeStamp) {//1是需要时分秒，2只需要年月日
    var time = new Date(timeStamp);
    let year = time.getFullYear();//ie火狐下都可以
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }
    if (second < 10) {
        second = '0' + second;
    }

    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;

}
global.getCollectArr = function () {
    return new Promise((resolve, reject) => {
        storage.load({key: 'collectGoods'}).then(res => {
            resolve(res)
        }).catch(e => {
            if (e.name == 'NotFoundError') {
                resolve([])
            }
        })
    });
}
global.getFootPrintArr = function () {
    return new Promise((resolve, reject) => {
        storage.load({key: 'footPrintGoods'}).then(res => {
            resolve(res)
        }).catch(e => {
            if (e.name == 'NotFoundError') {
                resolve([])
            }
        })
    });
}
global.addToCollect = async function (obj) {
    let date = new Date();
    obj.addTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay();
    let collectArr = await getCollectArr();
    let collectGoods = collectArr.findIndex(value => value.id === obj.id);
    let isExists = false;
    if(collectGoods != -1){//已存在收藏
        collectArr.splice(collectGoods, 1);
    }else{
        collectArr.unshift(obj);
        isExists = true;
    }
    storage.save({
        key: 'collectGoods',
        data: collectArr
    });
    return new Promise((resolve,reject) => {
        resolve(isExists)
    })


}
global.isCollect = async function (id) {
    let collectArr = await getCollectArr();
    return new Promise((resolve,reject) => {
        let collectGoods = collectArr.findIndex(value => value.id === id);
        if(collectGoods != -1){//已存在收藏
            resolve(true);
        }
        resolve(false);
    })

}
global.addToFootPrint = async function (obj) {

    let date = new Date();
    obj.addTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay();
    let footPrintArr = await getFootPrintArr();
    let footPrintGoods = footPrintArr.findIndex(value => value.id === obj.id);
    if(footPrintGoods != -1){//已存在足迹
        footPrintArr.splice(footPrintGoods, 1);
        footPrintArr.unshift(obj);
    }else{
        footPrintArr.unshift(obj);
        if (footPrintArr.length >= 11) {
            footPrintArr.pop();
        }
    }
    storage.save({
        key: 'footPrintGoods',
        data: footPrintArr
    });

}