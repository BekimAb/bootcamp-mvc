const path=require("path");
const express=require("express");
const session=require("express-seesion");
const exphbs=require("express-handlebars");

const app=express();
const PORT=process.env.port || 3001;
const sequelize=require("./config/connection");
const SequelizeStore=require("connect-seesion-sequelize")(session.Store);

const sess={
    secret:'secret',
    cokkie:{},
    resave:false,
    saveUninitialized:true,
    store:new SequelizeStore({
        db:sequelize
    })
};

app.use(session(sess));
const helper=require('./utils/helper');
const hbs=exphbs.create({helper});
app.engine('handlebars',hbs.engine);
app.set('view engine','handlebars');
app.use(express.json());
app.use(express.urlencoded({extedned:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(require('./controllers/'));
sequelize.sync({force:false}).then(()=>{
    app.listen(PORT,()=> console.log('now listening'));
});