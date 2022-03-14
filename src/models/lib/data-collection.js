'use strict';

class DataCollection {

    constructor(model) {
        this.model = model;
    }

    get(param) {
        if (typeof param == 'integer') {
            return this.model.findOne({ where: { id: id } });
        }
        if (typeof param != 'integer' && typeof param != 'string' ) {
            return this.model.findAll({});
        }
        if (typeof param == 'string') {
            return this.model.findAll({WHERE: { category: category}});
        }
    }

    create(record) {
        return this.model.create(record);
    }

    update(id, data) {
        return this.model.findOne({ where: { id } })
            .then(record => record.update(data));
    }

    delete(id) {
        return this.model.destroy({ where: { id } });
    }

}

module.exports = DataCollection;