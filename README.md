# `knexup`

A cli project starter/helper to get up and running with Knex.js projects.

# Installation

```shell
npm i -g knexup
```  

# Commands

### `init`

Initialize a project for knex usage. Installs knex dependencies and generates useful files including a knexup-config.js
file.

```shell
knexup init
```

Use the `-t` flag to generate TableInit migration helper objects. The example below will generate a TableInit object for
the User entity/model.

```shell
knexup -t user
```

### `project`

Bootstrap a new project for working with knex.js.

### `help`
See help info
```shell
knexup help
```