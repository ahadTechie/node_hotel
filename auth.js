const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');

passport.use(new LocalStrategy(async (username, password, done)=>{
  try{
    console.log('Received Credentials: ', username, password);
    const user = await Person.findOne({username});
    if(!user)
        return done(null, false, {message: "Incorrect Username"});
        
    const isPasswordMatch = user.password === password ? true : false;
    if(isPasswordMatch)
        return done(null, user);
    else
        return done(null, false, {message: "Incorrect Password"});

  }catch(err){
    return done(error)
  }
}));

module.exports = passport;

