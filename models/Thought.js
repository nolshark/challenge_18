const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({

    author: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now(),
        get: val => formatDate(val)
    },

    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },

    reactionText: {
        type: String,
        required: true,
        maxLength: 280,
    },

}, {
    toJSON: {
        getters: true
    },

    id: false
})

const thoughtSchema = new Schema({

    author: {
        type: String,
        required: true
    },

    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 180
    },

    createdAt: {
        type: Date,
        default: Date.now(),
        get: (val) => formatDate(val)
    },

    reactions: [reactionSchema]

}, {
    toJSON: {
        getters: true,
        virtuals: true,
    },

    id: false
})

function formatDate() {
    console.log(`The current date is ${this.createdAt}`)
}

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

module.exports = model('Thought', thoughtSchema);