const repository = require('../repositories/user-repository');
const authService = require('../services/auth-service');

exports.authenticate = async(req, res, next) => {
    try {        
        const username = req.body.username;
        const password = req.body.password;
        let company;
        let dateOfBirth;

        let user = await repository.authenticateUser({
            username: username,
            password: password
        });        

        if (!user) {
            res.status(404).send({
                message: 'Invalid user/password'
            });
            return;
        }
        else
        {
            user = JSON.parse(user);
            company = user.company;
            dateOfBirth = user.dateOfBirth;
        }
        const token = await authService.generateToken({            
            username: username,
            company: company,
            dateOfBirth: dateOfBirth
        });

        res.status(201).send({
            token: token,
            data: {
                username: username,
                company: company,
                dateOfBirth: dateOfBirth
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Error processing your request'
        });
    }
};

