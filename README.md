# `knexup`

A cli project starter/helper to get up and running with Knex.js projects.

# Installation

```shell
npm i -g knexup
```  

# Commands

### `knexup init`

Initialize a project for knex usage. Installs knex dependencies and generates useful files including a knexup-config.js
file.

```shell
knexup init
```

Pass the `-t, --table` flag to generate TableInit migration helper objects. The example below will generate a TableInit
object for
the "user" table.

```shell
knexup -t user
```

### `knexup project <projectName>`

Bootstrap a new project for working with knex.js.

- Pass the `-d, --databaseClient` flag to specify which database client
  driver dependency to install. You can specify any client supported by Knex.
- Pass the `-p, --path` flag to specify the path where the project should be created.

### `knexup help`

See help info

```shell
knexup help
```

# Dependencies Installed

The following dependencies are installed auto-installed by `knexup`:

- [knex](https://www.npmjs.com/package/knex)
- [objection](https://www.npmjs.com/package/objection)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [change-case](https://www.npmjs.com/package/change-case)
- [knexhelpers](https://www.npmjs.com/package/knexhelpers)
- Whichever database connection client is specified in the cli options. Defaults to `sqlite3`
