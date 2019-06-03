// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { app } = context;
    app.info('HAhaha');
    let i = 0;
    function recursive() {
      setTimeout(() => {
        app.debug(`My Itteration ${i}`);
        i++;
        if (i < 50) {
          recursive();
        }
      }, 5000);
    }
    recursive();
    return context;
  };
};
