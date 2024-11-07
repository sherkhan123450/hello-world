import { z } from 'zod';

const signUpSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    address : z.string().min(1, 'Address is required'),
});



const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});
export { signUpSchema, loginSchema };