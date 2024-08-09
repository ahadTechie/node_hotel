const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

personSchema.pre('save', async function (next) {
    const person = this;
    if (!person.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt); // Corrected 'hasedPassword' to 'hashedPassword'
        person.password = hashedPassword;
        next();
    } catch (err) {
        next(err); // Pass the error to the next middleware for proper error handling
    }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        // Use bcrypt to compare the provided password with the hashed password
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
        throw err; // Throw the error so it can be handled by the calling function
    }
};

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
