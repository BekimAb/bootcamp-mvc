const {Model,DataTypes}=require('sequelize');
const sequelize=require('../config/connect');
class Post extends Model{}
//create columns
Post.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isUrl:true
            }
        },
        desciption:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isUrl:true
            }
        },
        user_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'user',
                key:'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName:true,
        underscored:true,
        mdoelName:'post'
    }
);
module.exports=Post;