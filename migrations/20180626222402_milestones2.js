exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('milestones', function (table) {
            table.increments('id')
            table.string('description', 255);
            table.date('date_achieved');
            table.integer('famous_person_id').unsigned();
            table.foreign('famous_person_id').references('famous_people.id')
        })
    ])
};


exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('milestones')
    ])
};
