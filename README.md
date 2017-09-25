# act-backend 活动室申请系统后端

## Setup

- Edit `productionSettings.js` or `devSettings.js`
- Import `sql/schema.sql` to database
- Import all migration SQL files(`sql/migration*.sql`) to database in order

## Update
- Import migration SQL files(`sql/migration-<version>.sql`) to database

## Start

- Run `npm start` or `NODE_ENV=production npm start`
- If it's the first time to run the program, password will be initialized according to the setting
