[![Build Status](https://img.shields.io/travis/MetaCell/geppetto-scidash/master.svg?style=flat-square&label=master)](https://travis-ci.org/MetaCell/geppetto-scidash)
[![Build Status](https://img.shields.io/travis/MetaCell/geppetto-scidash/development.svg?style=flat-square&label=develop)](https://travis-ci.org/MetaCell/geppetto-scidash)
# geppetto-scidash


This repository contains the Geppetto extension for SciDash. This extension is designed to work with the Scidash backend app (see README on https://github.com/MetaCell/scidash for further details of how it all ties together).

The extension needs to be cloned into the Scidash django-app static folder, after cloning the geppetto frontend, to the path `org.geppetto.frontend/src/main/webapp/extensions/` and enabled with the following `GeppettoConfiguration.json` (this file resides in the Geppetto webapp folder):

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

To run tests:

Install locally packages:

``npm install jest@24.8.0 puppeteer@1.17.0 jest-puppeteer@4.3.0 @babel/preset-env@7.4.5 url-join@4.0.0 @babel/core@7.4.5``

Then navigate to folder 'geppetto-scidash/tests/jest' and run:

``npm test``

This will run the tests against the local server 'localhost:8000'.


