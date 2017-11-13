# geppetto-scidash

This repository contains the Geppetto extension for Geppetto SciDash
The extension needs to be cloned to org.geppetto.frontend/src/main/webapp/ and enabled with the following `GeppettoConfiguration.json`

```json
{
    "_README" : "http://docs.geppetto.org/en/latest/build.html",
    "contextPath": "org.geppetto.frontend",
    "useSsl": false,
    "embedded": false,
    "embedderURL": ["/"],
    "noTest": false,
    "extensions": {
        "geppetto-default/ComponentsInitialization": false,
        "geppetto-scidash/ComponentsInitialization": true
    },
    "themes": {
        "geppetto-default/colors": false,
        "geppetto-scidash/styles/colors": true
    }
}

```

