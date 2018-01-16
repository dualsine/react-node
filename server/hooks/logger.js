module.exports = function() {
  return context => {
    console.log('custom hook: ', context.data);
  }
}
