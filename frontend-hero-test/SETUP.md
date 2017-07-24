THIS IS A CONFIDENTIAL EXERCISE, WHICH IS PART OF A RECRUITING PROCESS AND AS SUCH, IT SHOULD NOT BE SHARED, DISTRIBUTED OR EXPOSED ANYWHERE. DOING SO, WILL AUTOMATICALLY DISQUALIFY YOU FROM THE PROCESS.

## Setup your system

### node.js v6.x

You will need [node.js](https://nodejs.org) v6.x. In case you want to manage several node versions on your machine, we recommend [nvm](https://github.com/creationix/nvm) for Mac/*nix and [nodist](https://github.com/marcelklehr/nodist) for Windows.

### Install NPM packages and run build

Once you have node.js installed, open up your OS's Terminal/Bash application,  change into the root folder of the test (where the file `package.json` is located) and run `npm install`.

After all NPM packages installed successfully, the build process will automatically trigger (you can do that manually by running `npm run build`). It will execute [linters](http://stackoverflow.com/questions/8503559/what-is-linting#8503586) for JavaScript, CSS and HTML and also pre-process SASS files and convert them to CSS. Please note that you will need a *working Internet connection* to run the HTML linter.

At this point you should get no errors which means that all linters successfully passed your code.

### IDE configuration

Please configure your IDE to use the [`.editorconfig`](http://editorconfig.org/#download), [`.stylelintrc`](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/complementary-tools.md#editor-plugins) and [`.eslintrc`](http://eslint.org/docs/user-guide/integrations#editors) files you find in the project's root folder. This way you will see you linting errors directly in your IDE.

### Helper tools

We've got NPM scripts prepared that can help you while you are developing.

Open up for each of the following commands a tab (or session) in your OS's Terminal/Bash application and run them from within the root folder of this test (where the `package.json` file is located).

* `npm run watch:lint` - starts the linters in watch mode; meaning on every file change the linters will run and give you instant feedback if there's something to improve
* `npm run watch:css`
    - every fill change on any `*.scss` file will trigger the SASS pre-processor and generate a CSS file
    - afterwards all CSS files be passed to [autoprefixer](https://github.com/postcss/autoprefixer) which removes the necessity for you to care about browser vendor prefixes (you are welcome!)

### Troubleshooting

If you experience problems during the setup please *STOP* and send a message to [Netcentric Human Resources](mailto:info@netcentric.biz) describing your steps and pasting the error log of your Terminal/Bash application.
