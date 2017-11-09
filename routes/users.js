var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './uploads' });

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register',{
  	title: 'Register'
  });
});
router.get('/login', function(req, res, next) {
  res.render('login',{
  	title: 'Login'
  });
});
router.post('/register', upload.single('profileimage'),function(req, res, next) {

	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	var proImg = req.file;

	//check for image field
	if(proImg){
		console.log('Uploading file...');
		//file info
		var profileImageOriginalname= req.file.originalname;
		var profileImagename= req.file.name;
		var profileImageOriginalMime= req.file.mimeType;
		var profileImageOriginalPath= req.file.path;
		var profileImageOriginalExt= req.file.extension;
		var profileImageOriginalSize= req.file.size;

	}
	else{
		//set default image
		var profileImageName= 'noimage.png';
	}

	//form validation
	req.checkBody('name', 'Name field is required').notEmpty();
	req.checkBody('email', 'Email field is required').notEmpty();
	req.checkBody('email', 'Email not valid').isEmail();
	req.checkBody('username', 'User Name field is required').notEmpty();
	req.checkBody('password', 'Password field is required').notEmpty();
	req.checkBody('password2', 'Password do not match').equals(req.body.password);

	//check for error
	var errors = req.validationErrors();
	if(errors){
		res.render('register',{
			errors: errors,
			name: name,
			email:email,
			username: username,
			password:password,
			password2:password2
		});
	}
	else{
		var newUser = new User({
			name: name,
			email:email,
			username: username,
			password:password,
			profileimage: profileImagename
		});

		//create user
		/*User.createUser(newUser, function(err,user){
			if(err){
				consol.log(user);
			}
		});*/

		req.flash('success','You are registered and may login');
		res.location('/');
		res.redirect();
	}

});

module.exports = router;
