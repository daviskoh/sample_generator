# How to make a Yeoman Generator

## Setup

Install Depedencies:
	
	npm install -g yo generator-generator

Setup your directory structure:

	mkdir generator-name

**Note**: **always** prefix your directory w/ 'generator'

For testing and using locally, create a symbolic link to your generator by running:

	npm link

## Use Generator

In your Command Line run:

	yo generator-name

in order to scaffold generator-name

	yo generator-name

and in order to use sub-generators

	yo name:subgenerator-name

## Folder / Directory Creation

Copy a directory from the templates folder:

	this.directory('oldname', 'new name');

Create a new directory:

	this.mkdir('directory-name');
	
Copy specific files:

	this.copy('file-in-templates-dir', 'new-location');

Write content to files:

	this.write('file-to-edit', content);
	
Import file-content as string:

	this.readFileAsString('file-path/file');

Remotely pull in files:

	

## Sub-Generators

### Have Broader Generator Call Its Sub-generator

``` javascript
this.hookFor('foo:app', {
    args: args,
    options: {
        options: {
            'skip-install': true;
        }
    }
});
```
	