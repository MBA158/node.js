const { z } = require('zod');

const expenseSchema = z.object({
    title: z.string().trim(),
    description: z.string().trim().optional(),
    amount: z.number().positive(),
    tag: z.enum([
        'Food',
        'Rent',
        'Transport',
        'Clothing',
        'Entertainment',
        'Health',
        'Education',
        'Other',
    ]),
    currency: z.enum(['USD', 'EUR', 'ILS']).default('ILS'),
});

module.exports = { expenseSchema };