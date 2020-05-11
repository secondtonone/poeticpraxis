/**
 *
 *
 * @export
 * @param {string} token
 * @param {string} idToken
 * @param {Object} list
 * @returns {Object}
 */
export default function makeListLinks(token, idToken, list) {
    let lowerCased = token.toLowerCase();

    let links = list[lowerCased] || [];

    links = [...links, idToken];

    list[lowerCased] = [...new Set(links)];

    return list;
}
