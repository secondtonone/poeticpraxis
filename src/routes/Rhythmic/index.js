function errorLoading(error) {
    throw new Error(`Dynamic page loading failed: ${error}`);
}

function loadRoute(cb) {
    return module => cb(null, module.default);
}

export default {
    path: 'rhythmic',
    getComponent (location, cb) {
        System.import('./Rhythmic')
        .then(loadRoute(cb))
        .catch(errorLoading);
    }
};
