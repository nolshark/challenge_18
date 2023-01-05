const { 
    Schema, 
    model,
 } = require('mongoose');

 
const userSchema = new Schema({

    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    },

    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],

}, {
    toJSON: {
        virtuals: true,
    },
    id: false
});

userSchema.virtual('friendCount').get(function() {
    const friendCount = this.friends.length;
    return friendCount
});


module.exports = model('User', userSchema);