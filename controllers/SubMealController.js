import Joi from 'joi';
import httpStatusCode from 'http-status-codes'
import SubMealService from '../services/SubMealService.js';

const SubCategories = ['Extra Portion', 'Protein', 'Soup', 'Drinks'];

export default class SubMealController {
    static async createMeal(request, response) {
        try {
            const mealData = request.body;
            const mealId = request.params.mealId;
            const createMeal = await SubMealService.createMeal(mealId, mealData)
            return response.status(httpStatusCode.OK).json(createMeal);
        } catch (error) {
            return response.status(error.status).json({message: error.message});
        }
    }
    
    static async updateMeal(request, response) {
        try {
            const mealData = request.body;
            const subMealId = request.params.subMealId;
            const updateMeal = await SubMealService.updateMeal(subMealId, mealData)
            return response.status(httpStatusCode.OK).json(updateMeal);
        } catch (error) {
            return response.status(error.status).json({message: error.message});
        }
    }

    static async getSubMeal(request, response) {
        try {
            const getSubMeal = await SubMealService.getSubMeal(request.params.subMealId)
            return response.status(httpStatusCode.OK).json(getSubMeal);
        } catch (error) {
            return response.status(error.status).json({message: error.message});
        }
    }

    static async deleteSubMeal(request, response) {
        try {
            const deleteSubMeal = await SubMealService.deleteSubMeal(request.params.subMealId)
            return response.status(httpStatusCode.OK).json(deleteSubMeal);
        } catch (error) {
            return response.status(error.status).json({message: error.message});
        }
    }

    static async getSubMealByMealId(request, response) {
        try {
            const mealId = request.params.mealId;
            const category = request.query.category;
            const getSubMeals = await SubMealService.getSubMealByMealId(mealId, category)
            return response.status(httpStatusCode.OK).json(getSubMeals);
        } catch (error) {
            return response.status(error.status).json({message: error.message});
        }
    }

    static validateAddMeal(request) {
        const validateMealSchema = Joi.object({
            name: Joi.string().min(3).required().messages({
                'string.base':'Meal name must be a string',
                'any.required':'Meal name is required',
                'string.length':'Meal name must be 6 digits'
            }),
            unit_price: Joi.string().required().pattern(/^[0-9]+$/).messages({
                'string.base':'Meal price must be a numeric value',
                'any.required':'Meal price is required',
                'string.pattern.base':'Only numeric digit is allowed'
            }),
            category: Joi.string().valid(...SubCategories).required(),
            is_available: Joi.boolean().required().messages({
                'boolean.base':'Availability must be a boolean value',
                'boolean.empty':'Please indicate availability for purchasing sake',
                'any.required':'Please indicate availability for purchasing sake'
            })
        })
        return validateMealSchema.validate(request.body, {abortEarly: false});
    }

    static validateUpdateMeal(request) {
        const validateMealSchema = Joi.object({
            name: Joi.string().min(3).messages({
                'string.base':'Meal name must be a string',
                'any.required':'Meal name is required',
                'string.length':'Meal name must be 6 digits'
            }),
            unit_price: Joi.string().pattern(/^[0-9]+$/).messages({
                'string.base':'Meal price must be a numeric value',
                'any.required':'Meal price is required',
                'string.pattern.base':'Only numeric digit is allowed'
            }),
            category: Joi.string().valid(...SubCategories),
            is_available: Joi.boolean().messages({
                'boolean.base':'Availability must be a boolean value',
                'boolean.empty':'Please indicate availability for purchasing sake',
                'any.required':'Please indicate availability for purchasing sake'
            })
        })
        return validateMealSchema.validate(request.body, {abortEarly: false});
    }

    static validateDeleteMeal(request) {
        const validateMealSchema = Joi.object({
            subMealId: Joi.string().required().messages({
                'string.base':'Sub Meal Id must be a string',
                'any.required':'Sub Meal Id is required'
            })
        })
        return validateMealSchema.validate(request.params, {abortEarly: false});
    }
}