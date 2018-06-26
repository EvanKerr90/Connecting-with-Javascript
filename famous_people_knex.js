const settings = require("./settings"); // settings.json
const myArgs = process.argv.slice(2);

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});

function output(result) {
  console.log("Searching...")
  console.log("Found " + result + " person(s) by the name " + myArgs + ":")
  for (index in result) {
    let date = result[index].birthdate
    console.log("- " + (Number(index) + 1) + ": " + result[index].first_name + " " + result[index].last_name + ", born '" + (date.getFullYear() + "-" + date.getDate() + "-" + (date.getMonth() + 1)) + "'")
  }
}

knex('famous_people').where('first_name', myArgs[0]).orWhere('last_name', myArgs[0])
  .asCallback(function (err, result) {
    if (err) {
      return console.log(err)
    } else {
      output(result);
      knex.destroy();
    }
  });