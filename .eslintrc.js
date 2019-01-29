module.exports = {
    extends: [
      "airbnb",
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        jquery: true,
        amd: true
    },
    plugins: [
        "react",
        "import"
    ],
    parser: "babel-eslint",
    parserOptions: {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "modules": true,
            "experimentalObjectRestSpread": true
        }
    },
    rules: {
      "react/prop-types": [ 0, {}], //disable prop-types check
      "react/jsx-indent": [2, 2],
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "error",
      "react/jsx-indent-props": [2, 2],
      "react/jsx-filename-extension": 0,
      "react/destructuring-assignment": [0],
      "react/no-multi-comp": [1, { "ignoreStateless": true }],
      "react/jsx-max-props-per-line": [ 1, { maximum: 5, when: "always" } ], // max props per line (even in single lined)
      "react/jsx-one-expression-per-line": [ 1, { allow: "single-child" }], // only allow one child in line
      "react/jsx-wrap-multilines" : [ 1, { declaration: "parens-new-line", assignment: "parens-new-line", return: "parens-new-line" }], // use new line for all these
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "no-tabs": 1,
      'no-console': 0,
      "curly": "error",
      "no-var": "error",
      "indent": [2, 2],
      "arrow-spacing": "error",
      "no-unused-vars": ['warn'],
      "keyword-spacing": "error",
      "react/display-name": 0,
      "space-infix-ops": "error",
      "no-multi-spaces": "error",
      "no-unneeded-ternary": "error",
      "no-multiple-empty-lines": "error",
      "spaced-comment": ["error", "always"],
      "arrow-parens": ["error", "as-needed"],
      "arrow-body-style": ["error", "as-needed"],
      "object-curly-spacing": ["error", "always"],
      "template-curly-spacing": ["error", "never"],
      "space-before-function-paren": [1, "always"],
      "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
      'jsx-a11y/no-static-element-interactions': [
         'error',
         { handlers: [
            'onClick',
            'onMouseDown',
            'onMouseUp',
            'onKeyPress',
            'onKeyDown',
            'onKeyUp',
          ],
         },
      ],
    },
    globals: {
        "G": true,
        "GEPPETTO": true,
        "casper": true,
        "endpoint": true,
        "message": true
    },
    "settings": {
      "react": {
        "createClass": "createReactClass", // Regex for Component Factory to use, default to "createReactClass"
        "pragma": "React",  // Pragma to use, default to "React"
        "version": "16.5.2", // React version, default to the latest React stable release
      },
      "propWrapperFunctions": [ "forbidExtraProps" ] // The names of any functions used to wrap the
    }
}
