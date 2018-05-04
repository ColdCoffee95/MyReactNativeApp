import {observable, action, computed} from 'mobx';

class appState {
    @observable status = 'active';

    @action
    changeStatus(status) {
        this.status = status;
    }
}

export default new appState();