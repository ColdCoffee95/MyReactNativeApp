import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    BackHandler,
    AppState,
    Alert
} from 'react-native';
import {observable, action} from 'mobx';
import {Provider, observer, inject} from 'mobx-react';
import Toast, {DURATION} from 'react-native-easy-toast';
import Loading from '../mobx/loading'
import appState from '../mobx/appState'
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
    componentDidMount() {
        SplashScreen.hide();
        this.checkForUpdate()
    }
    render() {
        return <Provider rootNavigation={rootNavigation}>
            <App/>
        </Provider>
    }
    checkForUpdate(){
        codePush.checkForUpdate(deploymentKey).then((update) => {
            if (update) {
                codePush.sync({
                        deploymentKey: deploymentKey,
                        updateDialog: {
                            optionalIgnoreButtonLabel: '稍后',
                            optionalInstallButtonLabel: '立即更新',
                            optionalUpdateMessage: '有新版本了，是否更新？',
                            title: '更新提示'
                        },
                        installMode: codePush.InstallMode.IMMEDIATE,

                    },
                    (status) => {
                        switch (status) {
                            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                                console.log("DOWNLOADING_PACKAGE");
                                break;
                            case codePush.SyncStatus.INSTALLING_UPDATE:
                                console.log(" INSTALLING_UPDATE");
                                break;
                        }
                    },
                    (progress) => {
                        console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
                    }
                );
                // Alert.alert(null, '发现新版本，是否立即更新？',
                //     [
                //         {
                //             text: "立即更新", onPress: () => {
                //                 codePush.sync();
                //             }
                //         },
                //         {
                //             text: "稍后更新", onPress: () => {
                //             }
                //         },
                //     ],
                //     {cancelable: false}
                // )

            }
        })
    }
}

@inject('rootNavigation')
@observer
class App extends React.Component {
    componentDidMount() {
        if (platform === 'Android') {
            this.backAndroidHandler = this.backHandle.bind(this);
            BackHandler.addEventListener('hardwareBackPress', this.backAndroidHandler);
        }
        global.ToastUtil = this.refs.toast;
        AppState.addEventListener("change", (newState) => {
            appState.changeStatus(newState);
        });
    }

    componentWillUnmount() {
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
            <View style={styles.rootContainer}>
                <RootNavigator
                    navigation={addNavigationHelpers({state, dispatch, addListener})}
                />
                <Toast ref='toast' position='center'>
                </Toast>
                {
                    Loading.loading && <LoadingView/>
                }
            </View>

        );
    }
}

function routeIsInCurrentState(state: Object, routeName: string) {
    if (state && state.routeName === routeName) {
        return true
    }

    if (state && state.routes) {
        return routeIsInCurrentState(state.routes[state.index], routeName)
    }

    return false
}

const defaultGetStateForAction = Route.router.getStateForAction;
Route.router.getStateForAction = (action, state) => {
    if (state && action.type === NavigationActions.BACK && action.routeName) {
//这里可以自己在外部自定义一个ActionType，然后判断是否是自定义的ActionType
        const backRoute = state.routes.find((route: *) => route.routeName === action.routeName);
        if (backRoute) {
            const backRouteIndex = state.routes.indexOf(backRoute);
            const route = {
                ...state,
                routes: state.routes.slice(0, backRouteIndex + 1),
                index: backRouteIndex,
            };
            return route
        }
    }
    if (state && action.type === NavigationActions.NAVIGATE) {
        if (routeIsInCurrentState(state, action.routeName)) {
//避免重复跳转
            return state
        }
    }
    return defaultGetStateForAction(action, state)
};
const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    }
});
let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };
export default codePush(codePushOptions)(Root);
