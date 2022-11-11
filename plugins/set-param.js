export default (context, inject) => {
  inject('setParam', (object) => {
    let param = '';
    let i = 0;
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        if (i == 0) {
          param = `?${key}=${object[key]}`;
        } else {
          param += `&${key}=${object[key]}`;
        }
      }

      i++
    }

    return param
  })
}