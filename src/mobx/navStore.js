// store
import {observable, action, computed} from "mobx";
import {NavigationActions, NavigationState} from "react-navigation";

import RootRouter from "../../App"; // 自己定义的路由结构

export class NavStore {
    @observable.ref navigatorState: NavigationState;

    constructor() {
        this.navigatorState = RootRouter.router.getStateForAction(
            NavigationActions.init(),
            null
        );
    }

    // 提供一个获取当前路由层级的功能
    getRouterName(state) {
        let childRouters = state.routes;
        if (childRouters && childRouters.length > 0) {
            let curRouterName = childRouters[state.index].routeName;
            let nextRouterName = this.getRouterName(childRouters[state.index]);
            let result = nextRouterName ? "-" + nextRouterName : "";
            return curRouterName + result;
        }
        return "";
    }

    @computed
    get routerName() {
        return this.getRouterName(this.navigatorState);
    }

    @action
    dispatch(action) {
        const previousNavState = this.navigatorState;
        this.navigatorState = RootRouter.router.getStateForAction(
            action,
            previousNavState
        );
        return this.navigatorState;
    }
}

export default new NavStore();