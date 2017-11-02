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
        "geppetto-osb/ComponentsInitialization": false,
        "geppetto-vfb/ComponentsInitialization": false,
        "geppetto-neuron/ComponentsInitialization": false,
        "geppetto-hm/ComponentsInitialization": false,
        "geppetto-scidash/ComponentsInitialization": true,
        "geppetto-extension-template/ComponentsInitialization": false
    },
    "themes": {
        "geppetto-default/colors": false,
        "geppetto-hm/pages/styles/colors": false,
        "geppetto-vfb/css/colors": false,
        "geppetto-neuron/css/colors": false,
        "geppetto-scidash/styles/colors": true,
        "geppetto-extension-template/styles/colors": false
    }
}

```

