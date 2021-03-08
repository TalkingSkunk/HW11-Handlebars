const orm = require('../config/orm');

const burgers = {
    name: 'burgers',

    select: async function(column, condition='') {
        return orm.select(column, this.name, condition);
    },

    insert: async function(column, values) {
        await orm.insert(this.name, column, values);
    },
    
    update: async function(changeColumn, condition) {
        await orm.update(this.name, changeColumn, condition);
    },


};

module.exports = burgers;