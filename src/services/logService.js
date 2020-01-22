import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "[YOUR_SENTRY_DSN_HERE]"
  });
}

function log(err) {
  Sentry.captureException(err);
}

export default {
  init,
  log
};
