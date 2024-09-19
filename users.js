const users = [
    {
        id:1,
        name: "john",
        age:39,
    },
    {
        id:2,
        name:"jane",
        age:25,
    }
];

const getUser = (index)=>{
    return users[index];
}

module.exports = {arr:users,fn: getUser};