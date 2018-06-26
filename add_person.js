const settings = require("./settings"); // settings.json
const myArgs = process.argv.slice(2);

var knex = require('knex')({
    client: 'pg',
    connection: {
        host: settings.hostname,
        user: settings.user,
        password: settings.password,
        database: settings.database
    }
});


knex('famous_people').insert({
        first_name: myArgs[0],
        last_name: myArgs[1],
        birthdate: myArgs[2]
    })
    .asCallback(function (err, result) {
        if (err) {
            return console.log(err)
        }
        knex.destroy();
    })