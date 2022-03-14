'use strict';

class DataCollection {

    constructor(model) {
        this.model = model;
    }

    get(id) {
        if (id) {
            return this.model.findOne({ where: { id: id } });
        }
        else {
            return this.model.findAll({});
        }
        // if (typeof param == 'string') {
        //     return this.model.findAll({WHERE: { category: category}});
        // }
    }

    create(record) {
        return this.model.create(record);
    }

    update(id, data) {
        return this.model.findOne({ where: { id : id} })
            .then(record => record.update(data));
    }

    delete(id) {
        return this.model.destroy({ where: { id : id } });
    }
    getByCat(category) {
        return this.model.findAll({ where: { category: category}})
    }

}

module.exports = DataCollection;