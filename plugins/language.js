export default (context, inject) => {
  inject('lang', (varTh, varEn) => {
    return (context.i18n.locale == 'th') ? varTh : varEn
  })
}