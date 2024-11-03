const { expenseSchema } = require('../lib/validation/expense');
const User = require('../models/user')
const Expense = require('../models/expense');
const { z } = require("zod");
const { userIdValidation } = require('../lib/validation/user');

const addExpense = async (req, res) => {
    try {
        const userId = userIdValidation.parse(req.params.userId);
        const { title, description, amount, tag, currency } = expenseSchema.parse(req.body);
        const userExists = await User.findById(userId);

        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const expense = new Expense({
            title,
            description,
            amount,
            tag,
            currency
        });

        await expense.save();

        userExists.expanses.push(expense);
        await userExists.save();

        return res.status(201).json({ message: 'Expense added succesfully' });


    } catch (error) {
        console.log(error)
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getExpenses = async (req, res) => {
    try {
        const userId = userIdValidation.parse(req.params.userId);
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }
        const expenses = await Expense.find({ _id: { $in: userExists.expanses } });
        return res.status(200).json(expenses);
    } catch (error) {
        console.log(error)
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const updateExpense = async (req, res) => {
    try {
        const userId = userIdValidation.parse(req.params.userId);
        const expenseId = userIdValidation.parse(req.params.expenseId);

        const { title, description, amount, tag, currency } = expenseSchema.parse(req.body);

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const expense = await Expense.findById(expenseId);
        if (!expenseId || !userExists.expanses.includes(expenseId)) {
            return res.status(404).json({ message: 'Expense not found' });
        }


        expense.title = title;
        expense.description = description;
        expense.amount = amount;
        expense.tag = tag;
        expense.currency = currency;

        await expense.save();

        return res.status(200).json({ message: 'expense updated successfully', expense });
    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const userId = userIdValidation.parse(req.params.userId);
        const expenseId = req.params.expenseId;

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const expenseIndex = userExists.expanses.indexOf(expenseId);
        if (expenseIndex === -1) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        userExists.expanses.splice(expenseIndex, 1);
        await userExists.save();

        await Expense.findByIdAndDelete(expenseId);

        return res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
};