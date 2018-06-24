const router = require('express').Router();
const Group = require('../db/models/group');
const User = require('../db/models/user');

router.post('/groups', async (req, res, next) => {
  try {
    const groupData = req.body;
    const group = await new Group(groupData).save();
    res.send(group);
  } catch (error) {
    next(error)
  }
});

router.get('/groups', async (req, res, next) => {
  try {
    const groups = await Group.find();
    res.send(groups);
  } catch (error) {
    next(error)
  }
});

router.get('/groups/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(id);
    if (!group) {
      return next();
    }
    const users = await User.find({group: id});
    res.send({
      ...group.toObject(),
      users
    });
  } catch (error) {
    next(error)
  }
});

router.post('/users', async (req, res, next) => {
  try {
    const userData = req.body;
    const user = await new User(userData).save();
    res.send(user);
  } catch (error) {
    next(error)
  }
});

module.exports = router;