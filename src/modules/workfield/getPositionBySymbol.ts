export default function getPositionBySymbol(symbol: string, token: string ): number {
  const regexp = new RegExp(symbol, 'i');
  return regexp.exec(token)?.index || -1;
}
