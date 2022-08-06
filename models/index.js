//import
const Post=require('./post');
const User=require('./user');
const Comment=require('./comment');

User.hasMany(Post, {
    foreignKey:'user_id'
});
Post.belongsTo(User, {
    foreignKey:'user_id',
    onDelete:'Set Null'
});
Comment.belongsTo(User,{
    foreignKey:'user_id',
    onDelete:'Set Null'
});
Comment.belongsTo(User,{
    foreignKey:'post_id',
    onDelete:'Set Null'
});
User.hasMany(Comment,{
    foreignKey:'post_id'
});
module.exports={User,Post,Comment};