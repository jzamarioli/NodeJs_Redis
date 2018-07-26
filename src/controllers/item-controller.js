const repository = require('../repositories/item-repository');
const guid = require ('../services/guid-service')

exports.set = async (req, res, next) => {        
    var key = guid.GenerateNewGuid();   // create a new key
    
    await repository.setCache(key, JSON.stringify(req.body) );
    console.log(`Inserted Item: ${key}`);
    res.status(201).send('Item inserted to the cache.');
}

exports.get = async (req, res, next) => {    
    var key = req.params.key;

    let value =  await repository.getCache(key);
    console.log(`Queried Item: ${key}`);
    res.status(200).send(value);    
}

exports.remove = async (req, res, next) => {    
    var key = req.params.key;

    await repository.removeCache(key);   
    console.log(`Deleted Item: ${key}`);     
    res.status(200).send('Item removed.');    
}

