const{Model,DataTypes}=require('sequelize');
const bcrypt=require('bcrypt');
const sequelize=require('../config/connect');
const { beforeCreate } = require('./post');
class User extends Model{
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw,this.password);
    }
}
//create columns
User.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isEmail:true
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                len:[4]
            }
        }
    },
    {
        hooks:{
            async beforeCreate(newUserData){
                newUserData.password=await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;   
            },
            async beforeUpdate(updatedUserData){
                updatedUserData.password= await bcrypt.hash(updatedUserData.password,10);
            }
        },
        sequelize,
        timestamps:false,
        freezeTableName:true,
        underscored:true,
        modelName:'user'
    }
);
module.exports=User;