const successCode = 10000;
import {Alert} from 'react-native';
const timeoutFetch = (original_fetch, timeout = 30000) => {
    let timeoutBlock = () => {}
    let timeout_promise = new Promise((resolve, reject) => {
        timeoutBlock = () => {
            // 请求超时处理
            reject('timeout promise')
        }
    })

    // Promise.race(iterable)方法返回一个promise
    // 这个promise在iterable中的任意一个promise被解决或拒绝后，立刻以相同的解决值被解决或以相同的拒绝原因被拒绝。
    let abortable_promise = Promise.race([
        original_fetch,
        timeout_promise
    ])

    setTimeout(() => {
            timeoutBlock()
        },
        timeout)

    return abortable_promise
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
        //fetch请求
        fetch(serverUrl + url, {
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
            .then((response) => response.json())
            .then((responseJSON) => {
                switch (responseJSON.code) {
                    case successCode:
                        callback(responseJSON);
                        break;
                    default:
                        Alert.alert(null, responseJSON.message)
                }
            })
            .catch((error) => {
                console.error(error)
            });
    }

    static async post(url, params, callback) {
        let loginState = await this.getLoginState();
        let userInfo = await this.getUserInfo();
        fetch(serverUrl + url, {
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
            .then((response) => response.json())
            .then((responseJSON) => {
                switch (responseJSON.code) {
                    case successCode:
                        callback(responseJSON);
                        break;
                    default:
                        Alert.alert(null, responseJSON.message)
                }
            })
            .catch((error) => {
                console.error("error = " + error)
            });
    }
}