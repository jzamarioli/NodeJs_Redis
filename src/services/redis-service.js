const config = require('../config.js')
const redis  = require('redis')
const bluebird  = require('bluebird')

let client, clientSubscriber;

var connect = () => {
    if (! client) {        
        // using bluebird promises on redis client        
        client = bluebird.promisifyAll(redis.createClient(config.redisConfig))

        client.on('connect', () => {
            //console.log('REDIS READY');
        });

        client.on('end', () => {
           //console.log('REDIS DISCONNECTED');
        });
 
        client.on('error', (e) => {
            console.log('REDIS ERROR', e);
        });
    }
}

var disconnect = () => {    
    if (client)    
        client.quit();            
    client = null;
}
  
var setCache = async (key, value) => 
{
    try {
        connect();
        await client.setAsync(key, value);
        //client.expire(key, 5)    
    }
    finally {
        disconnect();
    }        
}

var removeCache = async (key) => 
{
    try {
        connect();
        await client.delAsync(key);     
    }
    finally {
        disconnect();
    }   
}

var getCache = async (key) => 
{   
    let data;    
    
    try {
        connect();
        data = await client.getAsync(key);
    }
    catch(err) {
        data = err;
    }
    finally {
        disconnect();
    }  
    
    return data;
}


var SubscribeExpired = (e, r) => {  
    const DB = config.redisConfig.db;
    const expired_subKey = '__keyevent@' + DB + '__:expired'
    clientSubscriber.subscribe(expired_subKey, function() {
        console.log('Subscribed to "' + expired_subKey + '" event channel : ' + r);
        console.log('Logging Redis \'SET/GET/DEL\' commands and \'EXPIRED\' event...\n');
        clientSubscriber.on('message', function (chan, msg) {
            console.log('Expired item:', msg)
        })    
    })
}

function main() {    
    clientSubscriber = redis.createClient(config.redisConfig);  
    clientSubscriber.send_command('config', ['set','notify-keyspace-events','Ex'], SubscribeExpired); 
}

 main ();


module.exports = {
    setCache: setCache,
    getCache: getCache ,
    removeCache: removeCache
}
