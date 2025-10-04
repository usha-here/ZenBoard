require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
const PORT=3001;
require('./db/conn');
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb=require("./db/models/userSchema")

const clientid="220885124105-n55avtdvtf0mbs13d84do9fnqpr429bm.apps.googleusercontent.com"
const clientsecret="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"

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
    methods:['GET','POST','PUT','DELETE'],
})); 

app.use(express.json());

//setup session

app.use(session({
    secret:"123456hihihihihihi",
    resave:false,
    saveUninitialized:true,
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
        console.log("profile",profile)
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

//now we are done with initalizing passport .
//now we have to initialize google oauth

app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/dashboard",   //where to go after success
    failureRedirect:"http://localhost:3000/login"   //where to go if unsuccess login
}))

//to get user data after login
app.get("/login/success",async(req,res)=>{
   if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})

app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:3000/");
    })
})

// Simple classification endpoint (keyword-based heuristic)
app.post('/classify', (req, res) => {
    const { text } = req.body || {}
    if (!text || typeof text !== 'string') return res.status(400).json({ error: 'Missing text' })

    const t = text.toLowerCase()
    const mapping = [
        { cat: 'Dental', kws: ['tooth', 'toothache', 'dental', 'tooth pain', 'cavity'] },
        { cat: 'Mental Health', kws: ['anxiety', 'depression', 'therapy', 'mental', 'stress'] },
        { cat: 'Vision', kws: ['eye', 'vision', 'glasses', 'contact'] },
        { cat: 'Pharmacy', kws: ['medication', 'prescription', 'pill', 'pharmacy'] },
        { cat: 'Primary Care', kws: ['fever', 'cough', 'doctor', 'clinic', 'pain'] },
    ]

    for (const m of mapping) {
        for (const kw of m.kws) {
            if (t.includes(kw)) return res.json({ category: m.cat })
        }
    }

    return res.json({ category: 'Other' })
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

