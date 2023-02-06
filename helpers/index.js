const sendGrid = require("@sendgrid/mail");

function tryCatchWrapper(enpointFn) {
  return async (req, res, next) => {
    try {
      await enpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

function HttpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

async function sendMail({ to, subject, html }) {
  try {
    sendGrid.setApiKey(process.env.SENDGRID_KEY);
    const email = {
      from: "olevskijvlad@gmail.com",
      to,
      subject,
      html,
    };
    const response = await sendGrid.send(email);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  tryCatchWrapper,
  HttpError,
  sendMail,
};
