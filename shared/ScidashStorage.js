
export default class ScidashStorage {
    storageBackend = window.sessionStorage;

    constructor(){
        return this.storageBackend
    }
}

