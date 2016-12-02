# Static Web App Stack

A minimal boilerplate for a front-end-only web app using full ES6 features, with a bit of example code.
Uses `npm` only for package management.
The `gulpfile` is documented with the intended purpose of each task.
The gulpfile comes with the following features:

* Full ES6 transpilation with Babel -- transpiles ES6 modules to `SystemJS`
* Watch files for changes and run a dev server
* Publish to a `gh-pages` branch with the `deploy` task

The following base set of front-end libraries are included:

* `systemjs`, for implementing the transpiled module syntax
* `foundation-sites`, for the venerable [Foundation](http://foundation.zurb.com/sites.html) UI/CSS framework
* `jquery`, for basic DOM manipulation. If writing a more intensive web app, its highly recommended to replace this entirely with a decent MVC framework, such as [Vue](https://vuejs.org/).

The `package.json` comes with all version numbers at `0.0.0` --- this is so that you can switch to the latest version of the included packages each time you start a new project with this boilerplate.
It's recommended to use `npm-check-updates -u` to update every package in the file to its latest version.
You can install `npm-check-updates` globally with `npm install -g npm-check-updates`.
