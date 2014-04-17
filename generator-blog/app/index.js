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
        this.installDependencies(); // bower & npm dependencies
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
    // use '_' to indicate Lo-Dash will be used to process them

    // mkdir in current directory
    this.mkdir('posts');

    this.template('_index.md', 'posts/index.md');

    this.template('Gruntfile.js', 'Gruntfile.js');
    this.template('index.html', 'index.html');

    // this.method('old name', 'new name')

    // run Lo-Dash through file in 1st param and place compiled result at 2nd param
    // allows for dynamically generated content (look inside files for ex)
    this.template('_bower.json', 'bower.json');
    this.template('_config.json', 'config.json');
    this.template('_package.json', 'package.json');

    // copy files (from templates dir) into project's root dir
    this.copy('wordmap.json', 'wordmap.json');
  },

  runtime: function() {
    this.copy('bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = BlogGenerator;