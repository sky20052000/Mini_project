const config = require("./config/config");
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const passport = require("passport");
const userRoute = require("./routes/userRoutes");
const shopRoute = require("./routes/shopRoutes");
const auth = require("./middleware/passport");

// configauration
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(session({secret:"cats"
}));
app.use(passport.initialize());
app.use(passport.session())

// db connection
mongoose.connect(config.Mongo_Url).then((data)=>{
    console.log("Mongoose connected to db");
}).catch((err)=>{
    console.log("No database connection",err);
});

function isLoggedIn(req,res,next){
    req.user ? next():res.sendStatus(401)
}

app.get("/",(req,res)=>{
    res.send('<a href="/auth/google">Authenticate with Google</a>')
});

app.get("/auth/google",
passport.authenticate('google',{scope:['email',"profile"]})
);

app.get("/google/callback",
     passport.authenticate('google',{
        successRedirect:"/protected",
        failureRedirect:"/auth/failure"
     })
);

// failure auth route
app.get("/auth/failure",(req,res)=>{
    console.log("Something went wrong!")
})


// protected route 
app.get("/protected",isLoggedIn,(req,res)=>{
    res.send(`Hurrah! Google login successfully done! ${req.user.displayName}`);
})

/// logout 
app.get("/logout",(req,res,next)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
})

//set Route 
app.use("/api/user", userRoute);
app.use("/api/shop", shopRoute);

app.listen(config.PORT,()=>{
   console.log(`server listening on the:${config.HOST}:${config.PORT}`);
});