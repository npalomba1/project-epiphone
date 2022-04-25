const { Schema, model } = require("mongoose"); 

const userSchema = new Schema( 
    {
        username: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        }, 
        fullName: {
            type: String,
        }, 
        guitar: {
            type: String,
        },
        isAcoustic: {
            type: Boolean, 
        },
    },
    {
        timestamps: true
    }
); 

const User = model("User", userSchema); 

module.exports = User; 