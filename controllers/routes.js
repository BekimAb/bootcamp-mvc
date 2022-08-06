const router= require('express').Router();
const sequelize= require('../config/connect');
const {Post, User,Comment,Vote}= require('../models');

//posts for homepage
router.get('/',(req,res)=>{
    console.log('===');
    Post.findAll({
        attributes:[
            'id',
            'title',
            'description',
            'created_at'
        ],
        include:[
            {
                model:Comment,
                attributes:['id','comment_text','post_id','user_id','creat_at'],
                include:{
                    modle:User,
                    attributes:['username']
                }
            },
            {
                model:User,
                attributes:['username']
            }
        ]
    })
    .then(dbPostData =>{
        const posts= dbPostData.map(post =>post.get({plain:true}));
        res.render('homepage',{
            posts,
            loggedIn:req.sessions.loggedIn
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});
router.get('/post/:id',(req,res)=>{
    Post.findOne({
        where:{
            id:req.params.id
        },
        attributes:[
            'id',
            'title',
            'description',
            'created_at'
        ],
        include:[
            {
                model:Comment,
                attributes:['id','comment_text','post_id','created_at'],
                include:{
                    model:User,
                    attributes:['username']
                }
            },
            {
                model:User,
                attributes:['username']
            }
        ]
    })
    .then(dbPostData =>{
        if (!dbPostData){
            res.status(404).json({message:'no post found from id'});
            return;
        }
        const post= dbPostData.get({plain:true});
        res.render('single-post',{
            post,
            loggedIn:req.session.loggedIn
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});
router.get('/login',(req,res)=>{
    if (req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
});
module.exports=router;