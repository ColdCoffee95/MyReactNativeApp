import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';
var storage = new Storage({
    size : 1000,
    storageBackend: AsyncStorage,
    defaultExpires:null,
    enableCache:true,
    sync:{

    }
});
global.storage = storage;