global.jQuery = require("jquery");
global.GEPPETTO_CONFIGURATION = require('./GeppettoConfiguration.json');

jQuery(function () {
  require('geppetto-client-initialization');

  let ReactDOM = require("react-dom");
  let React = require("react");
  let Sentry = require("@sentry/browser")
  let App = require("./App").default;
  
  const fetchSettings = async () => {
    const response = await fetch("/api/settings/");
    return await response.json();
  };
  fetchSettings().then(settings => {
    Sentry.init({ 
      dsn: settings.sentry.dsn,
      environment: settings.sentry.env 
    });
  });
  
  require("./styles/scidash.less");

  G.enableLocalStorage(false);
  G.setIdleTimeOut(-1);

  document.title = "SciDash";

  let link = document.querySelector("link[rel*='icon']") || document.createElement("link");

  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = "https://scidash.github.io/assets/icons/favicon-32x32.png";

  document.getElementsByTagName("head")[0].appendChild(link);

  // Create router structure
  ReactDOM.render(
    <App />
    , document.getElementById("mainContainer")
  );
});
