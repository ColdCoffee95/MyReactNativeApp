import {NavigationActions} from 'react-navigation'
global.jumpAndClear = function (navigation,route) {
    resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName: route})//要跳转到的页面名字
        ]
    });
    navigation.dispatch(resetAction);
};