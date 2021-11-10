const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema ({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: 'Description is required'
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
    }
});

shopSchema.virtual('rating', {
    ref: 'Rating',
    localField: '_id',
    foreignField: 'shop',
    justOne: false
})

const Shop = mongoose.model('Shop', shopSchema);
module.exports = Shop;