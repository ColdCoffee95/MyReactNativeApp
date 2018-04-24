import React from 'react';
import {
    StyleSheet,
    View,
    BackHandler
} from 'react-native';
import {
    Scene,
    Router,
    Actions,
    Reducer,
    ActionConst,
    Overlay,
    Tabs,
    Modal,
    Drawer,
    Stack,
    Lightbox,
} from 'react-native-router-flux'
import LoginScreen from './screens/LoginScreen';
// import MainScreen from './screens/MainScreen';
const onBackPress = () => {
    if (Actions.state.index !== 0) {
        return false
    }
    Actions.pop()
    return true
}
export default Entry = ()=>(
    <Router backAndroidHandler={onBackPress}>
        <Stack>
            <Scene key="login" component={LoginScreen} hideNavBar></Scene>
            {/*<Scene key="main" component={MainScreen}></Scene>*/}
        </Stack>
    </Router>
)