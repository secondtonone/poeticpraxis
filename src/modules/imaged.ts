/* function splitAt(i, xs) {
    let ci = Math.ceil(i);
    let a = xs.slice(0, ci);
    let b = xs.slice(ci, xs.length) || '';
    return [a, b];
} */

function chunkArray(arr: string[], chunkSize: number) {
  const results:[first?: string, second?: string][] = [];

  while (arr.length) {
    results.push(arr.splice(0, chunkSize) as [first?: string, second?: string]);
  }

  return results;
}

/*function shuffle(arr) {
    return arr.sort(function() {
        return 0.5 - Math.random();
    });
}*/

function shuffle(a: string[]) {
  for (let i = a.length; i; i--) {
    const j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a;
}

/* function zip(xs) {
    return xs[0].map(function(_,i) {
        return xs.map(function(x) {
            return x[i];
        }).join(' ');
    });
} */

/*export default function imaged(words) {
    return zip(splitAt(words.length/2, shuffle(words)));
}*/

export function imaged(words: string[], chunkSize = 2) {
  return chunkArray(shuffle(shuffle(words)), chunkSize);
}

export function stringToWords(text = '') {
  const parsed = text.toLowerCase().match(/[a-zA-ZА-Яа-яёЁ'-]+/g);

  return parsed
    ? parsed.filter((n: string) => {
      return /[^'-]/g.test(n);
    }) || []
    : [];
}
