import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://d06139472c1449fcbf8ddc120f6b1e4b@sentry.io/1880370"
  });
}

function log(err) {
  Sentry.captureException(err);
}

export default {
  init,
  log
};
