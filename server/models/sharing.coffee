cozydb = require 'cozydb'
urlHelper = require 'cozy-url-sdk'
Client    = require('request-json').JsonClient

client = new Client urlHelper.dataSystem.url()
if process.env.NODE_ENV is "production" or process.env.NODE_ENV is "test"
    client.setBasicAuth process.env.NAME, process.env.TOKEN
    
module.exports = Sharing = cozydb.getModel 'Sharing',
    sharerUrl: String
    desc: String
    rules: [Object]
        # id: String
        # docType: String
    continuous: Boolean
    targets: Object
        # url: String
        # pretoken: String
    accepted: Boolean


Sharing.pendingBySharedDocType = (docType, callback) ->
    Sharing.request 'pendingBySharedDocType', key: docType, callback


sendAnswer = (data, callback) ->
    client.post 'services/sharing/sendAnswer', data, (err, res, body) ->
        if err
            callback err, res
        else
            callback null, @


Sharing.accept = (id, callback) ->
    sendAnswer {id: id, accepted: true}, callback


Sharing.refuse = (id, callback) ->
    sendAnswer {id: id, accepted: false}, callback
