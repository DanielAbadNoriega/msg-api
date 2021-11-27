const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: 'Description is required'
    },
    address: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: 'Image is required'
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
    }})

    restaurantSchema.virtual('rating',{
        ref: 'Rating',
        localField: '_id',
        foreignField: 'restaurant',
        justOne: false
    })

    const Restaurant = mongoose.model('Restaurant', restaurantSchema);
    module.exports = Restaurant;