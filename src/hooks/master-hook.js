// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
function recursive(app, i) {
  setTimeout(() => {
    app.debug(`My Itteration ${i}`);
    i++;
    if (i < 50) {
      recursive(app, i);
    }
  }, 5000);
}

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { app, method, type } = context;
    if (method === 'find' && type === 'before') {
      app.info('HAhaha');
      let i = 0;
      recursive(app, i);
    }
    return context;
  };
};
