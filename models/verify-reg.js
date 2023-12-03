import mongoose from 'mongoose';
import Joi from 'joi';

const regStatus = ['new', 'used'];

export const verifyRegSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: regStatus,
        required: true,
        default: 'new'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, { collection: 'verify_reg' })

verifyRegSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updated_at: new Date() });
    next();
})

const VerifyRegistration = mongoose.model('VerifyRegistration', verifyRegSchema);

export function validateVerifyToken(request) {
    const verifySchema = Joi.object({
        token: Joi.string().length(6).pattern(/^[0-9]+$/).required().messages({
            'string.base':'Verification token must be a string',
            'any.required':'Verification token is required',
            'string.length':'Verification token must be 6 digits',
            'string.pattern.base':'Only numeric digit is allowed'
        })
    })
    return verifySchema.validate(request, {abortEarly: false});
}

export default VerifyRegistration;