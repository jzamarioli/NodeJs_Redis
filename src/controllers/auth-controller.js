const repository = require('../repositories/auth-repository');
const authService = require('../services/auth-service');

exports.authenticate = async(req, res, next) => {
    try {        
        const username = req.body.username;
        const password = req.body.password;
        let name, company, role, dateOfBirth;

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
            name = user.name;
            company = user.company;
            role = user.role;
            dateOfBirth = user.dateOfBirth;
        }

        const token = await authService.generateToken({            
            name: name,            
            role: role
        });

        res.status(201).send({
            token: token,
            data: {
                name: name,
                username: username,
                company: company,
                role: role,
                dateOfBirth: dateOfBirth
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Error processing your request'
        });
    }
};