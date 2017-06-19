function errorLoading(error) {
    throw new Error(`Dynamic page loading failed: ${error}`);
}

function loadRoute(cb) {
    return module => cb(null, module.default);
}

export default {
    path: 'about',
    getComponent (location, cb) {
        System.import('./About')
        .then(loadRoute(cb))
        .catch(errorLoading);
    }
};