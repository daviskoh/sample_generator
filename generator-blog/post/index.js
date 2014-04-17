'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var PostGenerator = yeoman.generators.NamedBase.extend({
  // this.name => argument of subgenerator

  init: function () {
    console.log('You called the post subgenerator with the argument ' + this.name + '.');
  },

  files: function () {
    var today = new Date();

    var prefix = today.getUTCMonth() + 1
    + '-' + today.getDate()
    + '-' + today.getFullYear();

    var filename = prefix + '-' + this._.slugify(this.name) + '.md';
    var content = '# ' + this.name + '\n' + this.readFileAsString('somefile.js');
    // this.write writes 2nd param to file specified in 1st param
    this.write('posts/' + filename, content); // '#' for .md heading

    this.directory('meow', 'posts/meow');
  }
});

module.exports = PostGenerator;