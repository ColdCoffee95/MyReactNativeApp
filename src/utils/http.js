const successCode = 10000;
const timeout = 15000;
import {Alert} from 'react-native';
import Loading from '../mobx/loading'
function timeoutFetch(ms, promise) {//超时请求
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            Alert.alert('请求超时');
            reject("请求超时")
        }, ms);
        promise.then(
            (res) => {
                clearTimeout(timer);
                resolve(res)
            },
            (err) => {
                clearTimeout(timer);
                reject(err)
            }
        )
    })
}

function checkStatus(response) {//检查状态
    // console.log(response)
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    let error = new Error(response.status);
    error.response = response;
    throw error;
}
export default class HttpUtils {
    static getLoginState() {
        return new Promise((resolve, reject) => {
            storage.load({key: 'loginState'}).then(res => {
                resolve(res);
            }).catch(e => {
                if (e.name == 'NotFoundError') {
                    resolve({})
                }
            })
        })


    }

    static getUserInfo() {
        return new Promise((resolve, reject) => {
            storage.load({key: 'userInfo'}).then(res => {
                resolve(res);
            }).catch(e => {
                if (e.name == 'NotFoundError') {
                    resolve({})
                }
            })
        })
    }

    static async get(url, params, callback) {
        Loading.changeLoading(true);
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        let loginState = await this.getLoginState();
        let userInfo = await this.getUserInfo();
        return timeoutFetch(timeout, fetch(serverUrl + url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'isValidate': userInfo.authentication == 1 ? 1 : 0,
                    'token': loginState.token || '',
                    'memberId': loginState.memberId || '',
                    'version': global.version,
                    'platform': global.platform
                },
            })
                .then((response) => checkStatus(response))
                .then((response) => response.json())
                .then((responseJSON) => {
                    setTimeout(() => {
                        Loading.changeLoading(false);
                    }, 500);
                    switch (responseJSON.code) {
                        case successCode:
                            callback(responseJSON);
                            break;
                        default:
                            Alert.alert(null, responseJSON.message);
                            break;
                    }
                })
                .catch((error) => {
                    Loading.changeLoading(false);
                    Alert.alert('网络错误！')
                })
        )

    }

    static async post(url, params, callback) {
        Loading.changeLoading(true);
        let loginState = await this.getLoginState();
        let userInfo = await this.getUserInfo();
        return timeoutFetch(timeout, fetch(serverUrl + url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'isValidate': userInfo.authentication == 1 ? 1 : 0,
                    'token': loginState.token || '',
                    'memberId': loginState.memberId || '',
                    'version': global.version,
                    'platform': global.platform
                },
                body: JSON.stringify(params)
            })
                .then((response) => checkStatus(response))
                .then((response) => response.json())
                .then((responseJSON) => {
                    setTimeout(() => {
                        Loading.changeLoading(false);
                    }, 500);
                    switch (responseJSON.code) {
                        case successCode:
                            callback(responseJSON);
                            break;
                        default:
                            Alert.alert(null, responseJSON.message)
                    }
                })
                .catch((error) => {
                    Loading.changeLoading(false);
                    Alert.alert('网络错误！')
                })
        )

    }
}