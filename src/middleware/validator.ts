import Joi, { ObjectSchema, ValidationResult } from '@hapi/joi';

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    status?: string;
    stack: string;
}

interface ResetPasswordData {
    password: string;
    confirmPassword: string;
}

const validateUser = (data: UserData): ValidationResult => {
    const userValidationSchema: ObjectSchema<UserData> = Joi.object({
        firstName: Joi.string().min(3).required().messages({
            "string.min": "First Name must be at least 3 characters long",
            "any.required": "First Name is required",
        }),
        lastName: Joi.string().min(3).required().messages({
            "string.min": "Last Name must be at least 3 characters long",
            "any.required": "Last Name is required",
        }),
        email: Joi.string().email().required().messages({
            "string.email": "Please provide a valid email address",
            "any.required": "Email is required",
        }),
        phoneNumber: Joi.string().min(10).required().messages({
            "string.min": "Phone Number must be at least 10 digits",
            "any.required": "Phone Number is required",
        }),
        password: Joi.string().min(6).required().messages({
            "string.min": "Password must be at least 6 characters long",
            "any.required": "Password is required",
        }),
        status: Joi.string().optional().default("not-verified"),
        stack: Joi.string().min(6).required().messages({
            "string.min": "Stack must be at least 6 characters long",
            "any.required": "Please enter your Stack",
        }),
    });

    return userValidationSchema.validate(data, { abortEarly: false });
};

const validateResetPassword = (data: ResetPasswordData): ValidationResult => {
    const validateSchema: ObjectSchema<ResetPasswordData> = Joi.object({
        password: Joi.string()
            .min(8)
            .max(20)
            .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/))
            .required()
            .messages({
                "string.min": "Password must be at least 8 characters long",
                "string.max": "Password must not exceed 20 characters",
                "string.pattern.base": "Password must contain lowercase, uppercase, numbers, and special characters",
                "any.required": "Password field can't be left empty",
            }),
        confirmPassword: Joi.string()
            .min(8)
            .max(20)
            .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/))
            .required()
            .messages({
                "string.min": "Confirm Password must be at least 8 characters long",
                "string.max": "Confirm Password must not exceed 20 characters",
                "string.pattern.base": "Confirm Password must contain lowercase, uppercase, numbers, and special characters",
                "any.required": "Confirm Password field can't be left empty",
            }),
    }).custom((data, helpers) => {
        if (data.password !== data.confirmPassword) {
            return helpers.message({ custom: "Password and Confirm Password must match" });
        }
        return data;
    });

    return validateSchema.validate(data, { abortEarly: false });
};


const validateUpdatedUser = (data: UserData): ValidationResult => {
    const userValidationSchema: ObjectSchema<UserData> = Joi.object({
        firstName: Joi.string().min(3).messages({
            "string.min": "First Name must be at least 3 characters long",
            "any.required": "First Name is required",
        }),
        lastName: Joi.string().min(3).messages({
            "string.min": "Last Name must be at least 3 characters long",
            "any.required": "Last Name is required",
        }),
        email: Joi.string().email().messages({
            "string.email": "Please provide a valid email address",
            "any.required": "Email is required",
        }),
        phoneNumber: Joi.string().min(10).messages({
            "string.min": "Phone Number must be at least 10 digits",
            "any.required": "Phone Number is required",
        }),
        password: Joi.string().min(6).messages({
            "string.min": "Password must be at least 6 characters long",
            "any.required": "Password is required",
        }),
        status: Joi.string().optional().default("not-verified"),
        stack: Joi.string().min(6).messages({
            "string.min": "Stack must be at least 6 characters long",
            "any.required": "Please enter your Stack",
        }),
    });

    return userValidationSchema.validate(data, { abortEarly: false });
};


export { validateUser, validateResetPassword, validateUpdatedUser, };
