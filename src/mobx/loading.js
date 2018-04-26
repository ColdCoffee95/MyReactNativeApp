import {observable, action} from 'mobx';

class loading {
    @observable
    loading = false;

    @action
    changeLoading(bool) {
        this.loading = bool;
    }
}
export default new loading();