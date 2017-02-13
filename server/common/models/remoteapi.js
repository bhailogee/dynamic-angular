

var app = require("../../server/server");
module.exports = function(Remoteapis) {



    Remoteapis.createApi=function(apiName,cb){

        app.models.remoteapi.find(function(err,_remotes){
           if(err)
           {
               cb(err,null);
           }
            for(var i=0;i<_remotes++;i++)
            {
                var db = _remotes[ii]["datasources"] || app.dataSources.db;
                var api = db.buildModelFromInstance(_remotes[ii]["apiName"], user, {idInjection: true});

            }
        });

    }


    Remoteapis.remoteMethod(
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
