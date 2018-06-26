const { Client } = require("pg");
const settings = require("./settings"); // settings.json
const myArgs = process.argv.slice(2);

const client = new Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function output(result) {console.log("Found " + result.rowCount + " person(s) by the name " + myArgs + ":")
    for (index in result.rows) {
    let date = result.rows[index].birthdate
    console.log(Number(index) + 1 + ": " + result.rows[index].first_name + " " + result.rows[index].last_name + ", born " + (date.getFullYear() + "-" + date.getDate() + "-" + (date.getMonth() + 1)))
    }
}

function nameSearch(err, result) {
    client.query("SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name = ($1) OR last_name = ($1)", myArgs,(err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    output(result)
    client.end()
    });
}


client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    } else {
    return nameSearch()
    }
    });

