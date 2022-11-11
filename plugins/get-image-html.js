export default (context, inject) => {
  inject('getImageHtml', (str) => {
    var temp = document.createElement('div')
    temp.innerHTML = str
    let image_url;
    if (temp.querySelectorAll('img')[0] != null) {
      image_url = temp.querySelectorAll('img')[0].src
    } else {
      image_url = require('@/static/images/default-image.png')
    }
    return image_url
  })
}
