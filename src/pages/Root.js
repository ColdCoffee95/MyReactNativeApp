import React, {Component} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    BackHandler
} from 'react-native';
import {observable, action} from 'mobx';
import {Provider, observer} from 'mobx-react';
import Toast, {DURATION} from 'react-native-easy-toast';
import SplashScreen from 'react-native-splash-screen';
import nav from '../mobx/navStore';
import {addNavigationHelpers, NavigationActions,createNavigationContainer} from "react-navigation";
// console.disableYellowBox = true;
import App from '../../App';
@observer
export default class Root extends Component {
    @observable.ref navigationState = App.router.getStateForAction(
        NavigationActions.init(),
        null
    );

    @action
    dispatchNavigation = (action, stackNavState = true) => {
        const previousNavState = stackNavState ? this.navigationState : null
        this.navigationState = App.router.getStateForAction(action, previousNavState)
        return this.navigationState
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        SplashScreen.hide();
        console.warn('rootmount')
        if (platform === 'Android') {
            this.backAndroidHandler = this.backHandle.bind(this);
            BackHandler.addEventListener('hardwareBackPress', this.backAndroidHandler);
        }
        global.ToastUtil = this.refs.toast;
    }

    componentWillUnmount() {
        console.warn('componentWillUnmount')
        if (platform === 'Android') {
            BackHandler.removeEventListener('hardwareBackPress');
        }
    }

    backHandle() {

        console.warn('navigation', this.navigator.getCurrentRoutes())
        if (this.lastBackPressed && this.lastBackPressed + 500 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            BackHandler.exitApp();
            return false;
        }
        this.lastBackPressed = Date.now();
        this.refs.toast.show('再按一次退出应用', 500);
        return true;
    }

    render() {
        console.warn('dispatch', this.dispatchNavigation)
        console.warn('state', this.navigationState)
        return <Provider dispatchNavigation={this.dispatchNavigation}
                         navigationState={this.navigationState}>
            <SafeAreaView style={styles.rootContainer}>
                <App
                     navigation={addNavigationHelpers({
                         dispatch: this.dispatchNavigation,
                         state: this.navigationState,
                         addListener
                     })}
                />
                <Toast ref='toast' position='center'>
                </Toast>
            </SafeAreaView>
        </Provider>
    }
}
const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    }
});
