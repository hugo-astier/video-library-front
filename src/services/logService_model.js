import * as Sentry from "@sentry/browser";

// Create a Sentry account and copy your DSN here if you want to beneficiate from having logs in the cloud, and then remove '_model' to the file's name
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
