//https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url - источник
export function checkSource(testArg: any) {
  const objRE = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  )
  return !!objRE.test(testArg)
}

//https://renotes.ru/post-30/email-validator - источник
export function checkEmail(testArg: any) {
  const objRE = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,6})$/ // fragment locator
  return !!objRE.test(testArg)
}
