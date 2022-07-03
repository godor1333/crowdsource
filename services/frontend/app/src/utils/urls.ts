export function getRootedUrl(url: string) {
  return url.startsWith('http://') || url.startsWith('https://')
    ? url
    : '//' + url
}
