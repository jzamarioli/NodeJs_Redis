var redis = require('../services/redis-service');


exports.setCache = async (key, value) => {            
    await redis.setCache(key, value);    
}

exports.getCache = async (key) => { 
    return await redis.getCache(key);    
}

exports.removeCache = async (key) => {
    await redis.removeCache(key);        
}