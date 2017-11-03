module.exports = function(app, passport) {

    app.get('/login', function(req, res) {
      res.render('login', {
        title: 'Eloqui - Login' 
      });
    });

    app.get('/signup', function(req, res) {
      res.render('signup', {
        title: 'Eloqui - Signup',
        message: req.flash('signupMessage')
      });
    });

    app.post('/signup2', passport.authenticate('local-signup', {
        successRedirect : '/feed', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/feed', isLoggedIn, function(req, res) {
        res.render('feed', {
            title: 'Eloqui - Feed' ,
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/', function(req, res) {
      res.render('home', {
        title: 'Eloqui - Homepage',
        bodyClass: 'homepage'
      });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
