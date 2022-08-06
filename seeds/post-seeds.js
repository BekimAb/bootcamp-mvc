const {Post}=require('../models');
const postdata=[
    {
        title:'',
        desciption:'',
        user_id:1
    },
    {
        title:'',
        desciption:'',
        user_id:2
    },
    {
        title:'',
        desciption:'',
        user_id:3
    },
]
const seedPosts=()=> Post.bulkCreate(postdata);
module.exports=seedPosts;