function errorLoading(error) {
    throw new Error(`Dynamic page loading failed: ${error}`);
}

function loadRoute(cb) {
    return module => cb(null, module.default);
}

export default {
    path: 'images-engine',
    getComponent (location, cb) {
        System.import('./ImagesEngine')
        .then(loadRoute(cb))
        .catch(errorLoading);
    }
};