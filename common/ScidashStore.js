define(function(require){
    var Store = require('react-at-rest').Store;

    Store.API_PATH_PREFIX = '/api';
    Store.API_ENVELOPE = false;

    return class ScidashStore extends Store {

        path (action, id, {parentResourcesKey, parentResourceId, query} = {}) {
            var path;
            path = '';
            switch (action) {
                case 'index':
                case 'create': // nest if parent resource specified
                    if (parentResourcesKey != null) {
                        path += `/${parentResourcesKey}`;
                        if (parentResourceId != null) {
                            path += `/${parentResourceId}`;
                        }
                    }
                    path += `/${this.resourcesKey // shallow: show, update, destroy
                    }`;
                    break;
                default:
                    path += `/${this.resourcesKey}`;
                    if (id != null) {
                        path += `/${id}`;
                    }
            }
            return path;
        }
    }
})
