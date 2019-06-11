# hotel-group-db

## Usage

``` js
const setupDatabase = require('hotel-group-db')

setupDabase(config).then(db => {
  const { Hotel, Room } = db

}).catch(err => console.error(err))
```