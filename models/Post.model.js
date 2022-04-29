const { Schema, model } = require("mongoose"); 

const postSchema = new Schema(
    {
        title: {
            type: String
        },
        date: {
            type: String
        },
        content: {
            type: String
        },
        imageUrl: {
            type: String
        },
        // imageUrl: {
        //     type: String
        // },
        creatorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

    },
    {
        timestamps: true
    }

); 

const Post = model("Post", postSchema); 

module.exports = Post;