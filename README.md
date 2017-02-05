A minimal starter for an SPA (single page app) using the following technology:

* react - A popular view 'engine'.
* webpack - A Javascript (and other files) bundler for turning a bunch of loose (but organized) JS files into a single file, ready for the browser.
* babel - A Javascript transpiler (use the latest JS on yesterday's web browser)
* gulp - A task runner. Just a javascript alternative to a shell script, really.

## What does this contain?

* A solid webpack config, handling some common situations (static images, transpiling JS, an html template)
* A simple gulp file with common tasks (run webpack, clean)
* CSS pre-processing (SCSS) and CSS Modules configured in webpack.
* Babel configured to run the latest version of JS, with just the transforms needed for electron
* ESLint configured for (latest) JavaScript and React.

## What this boilerplate is NOT:

I do not currently do:

* Hot Module Reloading

## Getting started as a developer

Fork and/or clone this repo, then:

```
# install the dependencies
npm install

# run:
gulp build
electron .
```
