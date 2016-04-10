# Table Tome

[![Heroku](https://heroku-badge.herokuapp.com/?app=table-tome&style=flat&svg=1)](http://table-tome.herokuapp.com)
[![Build Status](https://travis-ci.org/table-tome/table-tome.svg?branch=master)](https://travis-ci.org/table-tome/table-tome)
[![Gitter](https://badges.gitter.im/table-tome/table-tome.svg)](https://gitter.im/table-tome/table-tome?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)
[![Trello](https://img.shields.io/badge/tasks-on%20trello-blue.svg)](https://trello.com/b/ZOigqCCD)
[![Dependency Status](https://david-dm.org/table-tome/table-tome.svg)](https://david-dm.org/table-tome/table-tome)
[![devDependency Status](https://david-dm.org/table-tome/table-tome/dev-status.svg)](https://david-dm.org/table-tome/table-tome#info=devDependencies)

A complete overhaul of the original [Table Tome](https://github.com/jonwrona/Table-Tome) (was my first web app, so a little ugly on the back-end). More open sourcey, let's build a community of Dungeon Masters, players, and developers, to improve the DnD 5e experience!

## Features

Table Tome is a Dungeons and Dragons 5th Edition Toolbox with big dreams. It is currently being served with Heroku at [tabletome.com](https://tabletome.com/). Any commits made to master will be served automatically on Heroku if the tests pass!

Base functionality will include:
  - A sortable table of spells.
  - User accounts.
  - Custom spell lists.

The dream:
  - Custom spells.
  - A community rating system for custom spells.
  - Shared spell lists.
  - A sortable table of items.
  - Custom items.
  - A table of monsters.
  - Etc.

## Develop With Me

I want to make joining the effort to develop Table Tome as easy as possible, so please if you have any suggestions head over to the [Slack](https://table-tome-slack.herokuapp.com/) and message me! Read the [wiki](https://github.com/table-tome/table-tome/wiki), do your best to write unit tests, adhere to the [coding standards](https://github.com/table-tome/table-tome/wiki/Coding-Standards), and try to follow the [Git branching guidelines](https://github.com/table-tome/table-tome/wiki/Git-Branching-Guidelines), and I'll work with you to make sure your changes end up being contributions!

## Getting Started

### Prerequisites

  - [Git](https://git-scm.com/)
  - [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/)
  - [MongoDB](https://www.mongodb.org/)
  - [Bower](http://bower.io/) (`npm install --g bower`)
  - [Grunt](http://gruntjs.com/) (`npm install --g grunt-cli`)
  - [Heroku Toolbelt](https://toolbelt.heroku.com/)

### Developing

  1. Run `npm install` to install server dependencies.
  2. Run `bower install` to install client-side dependencies.
  3. Make sure you have *MongoDB* running.
  4. Create a `.env` file using `.env.template`, filling in all of the necessary fields.
  5. Run `grunt build` to build the site.
  6. Run `heroku local` to preview the site.

### Testing
  
Running `npm test` or `grunt test` will run the unit tests that exist.

### Retrieving the Spells

If you have a database account, you can get an updated version of the spells using the following command:

    mongoexport --host ds059145.mlab.com:59145 --db heroku_j3rtcl39 -u <username> -p <password> --collection spells --out spells.json

If you do not have a database account, there is a `spells.json` file that should contain all of the official spells that have been entered into the database. If it seems out of date, create a github issue and I'll make sure I get it updated ASAP.

You can import the spells into your local mongo database using the following command:

    mongoimport --db tabletome --collection spells --file spells.json