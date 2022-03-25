export default function randomize(cb?: () => number | string): number | string {
  if (cb) {
    return cb();
  }

  const length = 4;
  const chars = '0123456789';
  let result = '';
  for (let i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}
