module.exports = function(Remoteapi) {
    Remoteapi.createApi=function(apiName,cb) {

        Remoteapi.app.models.remoteapi.find(function (err, _remotes) {
            if (err) {
                cb(err, null);
            }
        });
        Remoteapi.app.model(Remoteapi.app.dataSources.db.createModel("a.b"));
        Remoteapi.app.model(Remoteapi.app.dataSources.db.createModel("a.c"));
        Remoteapi.app.model(Remoteapi.app.dataSources.db.createModel("b"));
        Remoteapi.app.model(Remoteapi.app.dataSources.db.createModel("a"));
        Remoteapi.app.model(Remoteapi.app.dataSources.db.createModel("c"));



    }


    Remoteapi.remoteMethod(
        'createApi', {
            accepts: {
                arg: 'apiName',
                type: 'string'
            },
            returns: {
                arg: 'result',
                type: 'string'
            }
        }
    );


};
var extend = require('util')._extend;
var loopback = require('loopback');

function createModel(options) {
    var modelOptions = extend({ forceId: false }, options.options);
    var Model = loopback.PersistedModel.extend(options.parent, options.properties,
        modelOptions);
    if (options.app) options.app.model(Model);
    if (options.datasource) Model.attachTo(options.datasource);
    return Model;
}