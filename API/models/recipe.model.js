const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    ingredients: {
        type:[{String}]
    },
    steps: {
        type: [String]
    },
    image: {
        type: String
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
})

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;