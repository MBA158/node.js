const {incomeSchema} = require('../lib/validation/income');

const addIncome = async(req,res)=>{
    try {
        const {userId} = req.params;
        const {title,description,amount,tag,currency} = incomeSchema.parse(req.body);
    } catch (error) {
        console.log(error)
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}