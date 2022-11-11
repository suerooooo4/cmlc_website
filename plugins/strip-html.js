export default (context, inject) => {
  inject('stripHtml', (str) => {
    if (str) {
      let result = str.replace(/(<([^>]+)>)/gi, "")

      result = htmlDecode(result)

      return result
    } else {
      return str
    }
  })

  function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }
}