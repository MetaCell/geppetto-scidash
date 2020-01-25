define(function (require) {

  return function (GEPPETTO) {

    let ReactDOM = require("react-dom");
    let React = require("react");
    let Sentry = require("@sentry/browser");
    let App = require("./App").default;

    Sentry.init({dsn: "https://ccf48f7877bc4fb5a4cca74bdd193feb@sentry.io/1955654"});

    require("./styles/scidash.less");

    G.enableLocalStorage(false);
    G.setIdleTimeOut(-1);

    document.title = "SciDash";

    let link = document.querySelector("link[rel*='icon']") || document.createElement("link");

    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = "http://scidash.github.io/assets/icons/favicon-32x32.png";

    document.getElementsByTagName("head")[0].appendChild(link);

    // Create router structure
    ReactDOM.render(
      <App />
      , document.getElementById("mainContainer")
    );

  };

});
