require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
const PORT=3000;
require('./db/conn');
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb=require("./db/models/userSchema")

const clientid="220885124105-n55avtdvtf0mbs13d84do9fnqpr429bm.apps.googleusercontent.com"
const clientsecret="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"

app.use(cors({
    origin:'http://localhost:3000/',
    credentials:true,
    methods:['GET','POST','PUT','DELETE'],
})); 

app.use(express.json());

//setup session

app.use(session({
    secret:"123456hihihihihihi",
    resave:false,
    saveUninitialized:true
}))

//initialize passport ->setup passport 
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID:clientid,
        clientSecret:clientsecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    //above code return asyn data
    async(accessToken,refreshToken,profile,done)=>{
        try {
            let user = await userdb.findOne({googleId:profile.id});

            if(!user){   //user not present in database
                user = new userdb({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value
                });
                await user.save();  //saved in database
            }

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)

//session gives a encrypted data , we store that data using serialize and deserialize
passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

