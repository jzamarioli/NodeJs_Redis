exports.showHomePage = (req, res, next) => {
    res.render('index', { title: 'Express' }); 

    // res.status(200).send({
    //     title: "Node Express API",
    //     version: "0.0.1"
    // });
	
};
