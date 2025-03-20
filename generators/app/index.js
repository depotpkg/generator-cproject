'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the first-rate ${chalk.red('generator-cproject')} generator!`));
    return this.prompt([{
      type: 'input',
      name: 'projectName',
      message: 'What is your project name?',
      default: this.appname
    }, {
      type: 'input',
      name: 'shortName',
      message: 'What is the short name of your project?',
      default: this.appname
    }]).then(props => {
      this.props = props;
      this.props.shortPrefix = props.shortName.toUpperCase();
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationPath(),
      this.props
    );
    this.fs.copy(
      this.templatePath('.*'),
      this.destinationPath()
    );
  }
};
