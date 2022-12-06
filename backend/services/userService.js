// importing the user model
const User = require("../models/userModel");

const search = (query)=>{
    const params = {...query}
    return User.find(params);
}
const searchOne = (query) =>{
  const params = {...query}
  return User.findOne(params);
}

// creating the new user/ post method
const save = (user)=>{
    const newuser = new User(user);
    return newuser.save();
}

// updating the fields/ put method
const update = (id, hashedPassword)=>{
    return User.updateOne({
        _id: id
      }, {
        $set: {
          password: hashedPassword
        }
      });
}
const findAndUpdate = (id, payload)=>{
    return User.findByIdAndUpdate(id, payload);
}

module.exports = { search, save, update, findAndUpdate, searchOne}