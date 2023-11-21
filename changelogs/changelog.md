# `knexup Changelogs`

## 0.1.0-alpha

- `knexup init` now only creates the config file. Other functionalities moved to new commands.
- New command: `knexup bootstrap` to generate knex files and dependencies
- New command: `knexup table-init` that handles generation of table-init schema helper objects.
- Bugfix for folder mix-up when running `knexup project`.
- Bugfix for issue where the installed dependencies are being overwritten and not showing in package.json.