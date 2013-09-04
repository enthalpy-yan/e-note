/*
 * GET home page.
 */



exports.index = function(req, res){
    res.render('index');
};

exports.testLogin = function(req, res){
    res.render('testLogin');
};

exports.partials = function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
};