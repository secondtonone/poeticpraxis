export default function (temp: string): RegExp {
  return new RegExp(`[${temp}]`, 'i');
}
