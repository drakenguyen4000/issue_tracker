const moment = require("moment-timezone");

module.exports = {
  //Passing data & message to front end
  respond: function (record, message, res) {
    const data = {
      record: record,
      message: { msgBody: message, msgError: false },
    };
    res.status(200).json(data);
  },
  //Passing only messages
  message: function (message, res) {
    const data = {
      message: { msgBody: message, msgError: false },
    };
    res.status(200).json(data);
  },
  getLocalTime: function () {
    const date = moment.utc().format("YYYY-MM-DD HH:mm:ss");
    const stillUtc = moment.utc(date).toDate();
    const local = moment(stillUtc).local().format("YYYY-MM-DDTHH:mm:ss.000+00:00");
    return local;
  }

};
