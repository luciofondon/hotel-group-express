const Base = require('./src/services/Base')
const Hotel = require('./src/services/Hotel')
const config = require('./config/config.js');
//global.server

async function print(){
    const data = await new Hotel().getHotels()
    console.log(data)

}

print()