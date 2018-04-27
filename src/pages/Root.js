import React, {Component} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    BackHandler,
    ActivityIndicator
} from 'react-native';
import {observable, action} from 'mobx';
import {Provider, observer, inject} from 'mobx-react';
import Toast, {DURATION} from 'react-native-easy-toast';
import Loading from '../mobx/loading'
import LoadingView from '../components/common/LoadingView'
import NavigationStore from 'react-navigation-mobx-helpers';
import codePush from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';
import {addNavigationHelpers, NavigationActions, createNavigationContainer} from "react-navigation";
import Route from '../../App';
const RootNavigator = Route;
const rootNavigation = new NavigationStore(RootNavigator);
// console.disableYellowBox = true;
class Root extends Component {
    render() {
        return <Provider rootNavigation={rootNavigation}>
            <App/>
        </Provider>
    }
}

@inject('rootNavigation')
@observer
class App extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            SplashScreen.hide();
        }, 2000);

        if (platform === 'Android') {
            this.backAndroidHandler = this.backHandle.bind(this);
            BackHandler.addEventListener('hardwareBackPress', this.backAndroidHandler);
        }
        global.ToastUtil = this.refs.toast;
        console.warn(codePush);

    }

    componentWillUnmount() {
        console.warn('componentWillUnmount')
        if (platform === 'Android') {
            BackHandler.removeEventListener('hardwareBackPress');
        }
    }

    backHandle() {
        const nav = this.props.rootNavigation;
        const routers = nav.state.routes;
        if (routers.length > 1) {
            nav.pop();
            return true;
        } else {
            if (this.lastBackPressed && this.lastBackPressed + 500 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                BackHandler.exitApp();
                return false;
            }
            this.lastBackPressed = Date.now();
            ToastUtil.show('再按一次退出应用');
            return true;
        }
    }

    render() {
        const {state, dispatch, addListener} = this.props.rootNavigation;
        return (
            <SafeAreaView style={styles.rootContainer}>
                <RootNavigator
                    navigation={addNavigationHelpers({state, dispatch, addListener})}
                />
                <Toast ref='toast' position='center'>
                </Toast>
                {
                    Loading.loading && <LoadingView/>
                }
            </SafeAreaView>

        );
    }
}
const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    }
});
export default Root;
