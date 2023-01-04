// Will in office hours

function checkAuth(req, res, next) {
    if (req.session.currentUser) {
        next();
    } else {
        res.redirect('/')
    };
    // console.log('im checking authentication'); 
};

module.exports = checkAuth