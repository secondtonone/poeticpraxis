function splitAt(i, xs) {
    let ci = Math.ceil(i);
    let a = xs.slice(0, ci);
    let b = xs.slice(ci, xs.length) || '';
    return [a, b];
}

function chunkArray(arr, chunkSize){
    var results = [];

    while (arr.length) {
        results.push(arr.splice(0, chunkSize));
    }

    return results;
}

/*function shuffle(arr) {
    return arr.sort(function() {
        return 0.5 - Math.random();
    });
}*/

function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
}

function zip(xs) {
    return xs[0].map(function(_,i) {
        return xs.map(function(x) {
            return x[i];
        }).join(' ');
    });
}

/*export default function imaged(words) {
    return zip(splitAt(words.length/2, shuffle(words)));
}*/

export default function imaged(words, chunkSize = 2) {

    return chunkArray(shuffle(shuffle(words)),chunkSize);
}