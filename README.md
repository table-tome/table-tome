# Table Tome

[![Build Status](https://travis-ci.org/table-tome/table-tome.svg?branch=master)](https://travis-ci.org/table-tome/table-tome)
[![Slack Status](https://table-tome-slack.herokuapp.com/badge.svg)](https://table-tome-slack.herokuapp.com/)
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

### Developing

  1. Run `npm install` to install server dependencies.
  2. Run `bower install` to install client-side dependencies.
  3. Make sure you have *MongoDB* running.
  4. Run `grunt build` for building and `grunt serve` for previewing.

### Testing
  
Running `npm test` or `grunt test` will run the unit tests.
