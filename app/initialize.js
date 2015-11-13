var initializeModule = (function() {
    'use strict';

    var elements = {
        video: document.querySelector('.black-inks')
    };

    return {
        getElement: function(el) {
            return elements[el];
        }
    };

})();