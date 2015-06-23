CAMHSReady [![Build Status](https://travis-ci.org/marxian/CAMHSReady.png?branch=develop)](https://travis-ci.org/marxian/CAMHSReady)
========

An angularjs application for the [CAMHSReady Project](http://www.camhsready.org)

Getting started:

    git clone git@github.com:marxian/CAMHSReady.git
    cd CAMHSReady
    npm install
    grunt test

Building Releases:

	git flow release start x.x.x
	# Bump the version in package.json and component.json
	grunt build
	git commit -a
	git flow release finish x.x.x
	git push origin develop && git checkout master && git push origin master --tags

Coverage reports are available in /coverage after every test run.

## Editing Copy

Most of CAMHSReady's interface text is held in JSON files in https://github.com/marxian/CAMHSReady/tree/develop/data Editing files there, and committing the changes to github will cause the staging site to rebuild. 

Once you're happy you can merge the develop branch to master which will rebuild the production site. If that last sentence was mysterious please email a developer and ask them to make the merge for you.

The simplest way to tweak text is as follows.

* Log in to github
* Head to https://github.com/marxian/CAMHSReady/tree/develop/data
* NB: Please nesure that the selected branch is "develop" so that your changes can be built and tested on stage before going live.
* Find the text you wish to change and use github's editor to make your adjustment.
* Commit the change, including a useful message describing your change.
* Monitor the build process here: https://travis-ci.org/marxian/CAMHSReady
* Check your changes on the staging site.

Some text is still held in templates in /views or /app/views - these can be changed in the same way.

