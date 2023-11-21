# `knexup`

A cli project starter/helper to get up and running with Knex.js projects.

# Installation

```shell
npm i -g knexup

# or 
yarn global add knexup
```  

# Usage

### Start with `knexup init`

This should be the first thing when using `knexup` in an existing project.

This generates the knexup config file in the project. Open the config file and edit/confirm your preferred knex
location (`knexDir`). This is where knex files and other featured helpers will be generated.

### `knexup bootstrap`

Generates files and installs dependencies for working with knex.js in an existing project.

### `knexup table-init`

Generates TableInit schema-creation helper objects for each table specified via the `-t | --table` flag. The
"table-init" sub-command argument can be omitted also, in which case the arguments after that will serve as the tables
input.

The examples below will generate a TableInit helper object for the "user" table.

```shell
knexup table-init user
knexup -t user
```

### To bootstrap a new project, use `knexup project <projectName>`

Bootstrap a new project for working with knex.js.

- Pass the `-d, --databaseClient` flag to specify which database client
  driver dependency to install. You can specify any client supported by Knex.
- Pass the `-p, --path` flag to specify the path where the project should be created. If not specified, it defaults to
  the current directory in which the command is run.

### `knexup help`

See help info

```text
Options:
  -p, --path <char>             Path relative to project root.
  -t, --table [tables...]       Database table name(s).
  -d, --database-client <char>  The preferred database client (mysql|postgres|sqlite)
  -h, --help                    display help for command

Commands:
  init                          Initialize a project for Knex development. Generates TableInit migration helper object for table "create" migration. Also creates a knexup config file if it does not exist.
  project <projectName>         Generate a project based on knex.js
  bootstrap                     Generates files and installs dependencies for working with knex.js.
  table-init                    Generates table-init schema-creation helpers for each table specified via --table
  help [command]                display help for command
```

# Dependencies Installed

The following runtime dependencies are installed by the `knexup project` command:

- [knex](https://www.npmjs.com/package/knex)
- [objection](https://www.npmjs.com/package/objection)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [knexhelpers](https://www.npmjs.com/package/knexhelpers)
- Whichever database connection client is specified in the cli options. Defaults to `sqlite3`

The following dev dependencies are auto-installed by the `knexup project` command:

- [@types/node](https://www.npmjs.com/package/@types/node)
- [@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker)
- [prettier](https://www.npmjs.com/package/prettier)
- [typescript](https://www.npmjs.com/package/typescript)
- [ts-node](https://www.npmjs.com/package/ts-node)
- [tsx](https://www.npmjs.com/package/tsx)

The following runtime dependencies are installed by the `knexup bootstrap` command:

- [knex](https://www.npmjs.com/package/knex)
- [objection](https://www.npmjs.com/package/objection)
- [knexhelpers](https://www.npmjs.com/package/knexhelpers)

The following dev dependencies are installed by the `knexup bootstrap` command:

- [ts-node](https://www.npmjs.com/package/ts-node)
- [tsx](https://www.npmjs.com/package/tsx)

# Changelogs
See changelogs [here](./changelogs/changelog.md)