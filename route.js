
module.exports = function(app, express, passport) {
/*
    app.get('/api/user', function(req, res){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(req.user));
    });


    app.get('/', function(req, res){
        res.send("heyo");
    });

    app.post('/login/callback',
        passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
        function(req, res) {
            res.send("login/callback callback after athentication");
            //res.redirect('/?user='+req.user.nameID);
        }
    );

    app.get('/login',
        passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
        function(req, res) {
            res.send("fail");
        }
    );*/


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
