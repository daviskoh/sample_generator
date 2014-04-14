'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var BlogGenerator = yeoman.generators.Base.extend({
  // each function executed in order written like Rails Generator
  init: function () {
    this.pkg = require('../package.json');

    // listen for end event (when methods defined below are done executing)
    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    // this.async() => returns function that is passed into async task as callback
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Blog generator.'));

    // list of prompts to be asked to user
    var prompts = [
      {
        type: 'confirm',
        name: 'someOption',
        message: 'Would you like to enable this option?',
        default: true
      },
      {
        name: 'blogName',
        message: 'What do you want to call your blog?'
      }
    ];

    // function from Inquirer.js cli module
    this.prompt(prompts, function (props) {
      // props is an object containing response values w/ attribute names associated w/ 'name' attribute of each prompt
      this.blogName = props.blogName;

      // this.async() return value called here inside callback
      // rest of generator process PAUSED until this callback process is finished
      done();
    }.bind(this)); // bind context to BlogGenerator
  },

  app: function () {
    // mkdir in current directory
    this.mkdir('posts');

    // place files (from templates dir) into project's root dir
    // this.copy('old name', 'new name')
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = BlogGenerator;