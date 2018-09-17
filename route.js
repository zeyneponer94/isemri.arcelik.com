
module.exports = function(app, express, passport) {

    app.get('/login', passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }), function(req, res) {
        res.send("login/callback callback after athentication");
    });
    
    //POST Methods, redirect to home successful login
    app.post('/login/callback', passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }), function(req, res) {
       // res.send(req.isAuthenticated());
       res.send("login/callback callback after athentication");
       // res.redirect('/workorder');
    });

}
