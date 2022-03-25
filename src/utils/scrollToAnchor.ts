export default function scrollToAnchor(): void {
  const urlHash: string = window.decodeURIComponent(window.location.hash);
  const hashParts: string[] = urlHash.split('#');

  if (hashParts.length > 1) {
    const hash: string = hashParts.slice(-1)[0];
    document.querySelector(`#${hash}`)?.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
  }
}
