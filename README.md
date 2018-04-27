# geppetto-scidash

This repository contains the Geppetto extension for SciDash. This extension is designed to work with the Scidash backend app (see [README](https://github.com/MetaCell/scidash on that repo) for further details of how it all ties together). 

The extension needs to be cloned into the Scidash static folder, after cloning the geppetto frontend, to the path `org.geppetto.frontend/src/main/webapp/extensions/geppetto-scidash` and enabled with the following `GeppettoConfiguration.json` (this file resides in the Geppetto webapp folder):

```json
{
	"_README": "http://docs.geppetto.org/en/latest/build.html",
	"contextPath": "org.geppetto.frontend",
	"useSsl": false,
	"embedded": false,
	"embedderURL": ["/"],
	"rootRedirect": "",
	"noTest": false,
	"extensions": {
		"geppetto-default/ComponentsInitialization": false,
		"geppetto-scidash/ComponentsInitialization": true
	},
	"themes": {
		"geppetto-default/colors": false,
		"geppetto-scidash/styles/colors": true
	},
	"properties": {
		"title": "SciDash",
		"description": "SciDash is a project that enables the reproducible execution and visualization of data-driven unit test for assessing model quality.",
		"type": "website",
		"url": "http://scidash.github.io/",
		"icon": "http://scidash.github.io/assets/icons/favicon-32x32.png",
		"image": "http://scidash.github.io/assets/scidash-text.png"
	}
}
```

