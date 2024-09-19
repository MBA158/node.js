const users = [
    { id: 1, name: 'john' },
    { id: 2, name: 'jon' },
    { id: 3, name: 'jhon' }
];

const getUsers = (req,res)=>{
    return res.json(users);
};

const addUser = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'name is required' });
    }
    const nameExists = users.find((user) => user.name === name);
    if (nameExists) {
        return res.status(400).json({ error: 'name already exists' });
    }
    const user1 = {
        id: users.length + 1,
        name,
    };
    users.push(user1);
    return res.status(201).json(users);
};

const deleteUser = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'name is required' });
    }
    const index = users.findIndex((user) => user.name === name);
    if (index === -1) {
        return res.status(404).json({ error: 'name does not exist' });
    }
    users.splice(index, 1);
    return res.status(200).json(users);
};

const updateUser =(req, res) => {
    const { name } = req.body;
    const { id } = req.query;
    if (!id) {
        return res.status(400).json({ error: 'id doesnt exist' });
    }
    if (!name) {
        return res.status(400).json({ error: 'name is required' });
    }
    const nameExists = users.find((user) => user.name === name && user.id);
    if (nameExists) {
        return res.status(400).json({ error: 'name already exists' });
    }
    newid = Number(id);
    if (isNaN(newid)) {
        return res.status(400).json({ error: 'id must be a number' });
    }
    const index = users.findIndex((user) => user.id === newid);
    if (index === -1) {
        return res.status(400).json({ error: 'user not found' });
    }
    users[index].name = name;
    return res.status(200).json(users);
};

module.exports = {
    getUsers,
    addUser,
    deleteUser,
    updateUser
}