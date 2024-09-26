const User = require('../models/user');

const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jenny' },
    { id: 3, name: 'Jennifer' },

]


const getUser = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



const addUser = (req, res) => {
    const { name, email, password } = req.body;

    const newUser = new User({name, email, password});
    newUser.save();

    return res.status(201).json(newUser);
};


const deleteUser = (req, res) => {
    const { id } = req.params;

    const index = users.findIndex((user) => user.id === +id);

    if (index === -1) {
        return res.status(404).json({ error: 'user does not exist' });
    }
    users.splice(index, 1);
    return res.status(200).json(users);
}


const updateUser = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const user = users.find((user) => user.id === +id); //'+' makes casting from string to number

    if (!user) {
        return res.status(404).json({ error: 'user not found' });
    }

    const userExist = users.find((user) => user.name === name)
    if (userExist) {
        return res.status(400).json({ error: 'Name already exists' })
    }

    user.name = name;
    return res.status(200).json(users);
}


module.exports = {
    getUser,
    addUser,
    deleteUser,
    updateUser,
}