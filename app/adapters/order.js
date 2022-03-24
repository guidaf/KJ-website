import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class OrderAdapter extends JSONAPIAdapter {
    findAll(store, type, id, snapshot) {
        var url = "/api/orders.json";
        return this.ajax(url, 'GET');
    }
}
