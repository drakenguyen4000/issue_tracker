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
  }
};
