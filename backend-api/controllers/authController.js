const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Bills = require('../models/bill');

// CREATE USER
router.post('/', async (req, res) => {
  console.log(`Login data sent to Server: ${JSON.stringify(req.body)}`)

  try {
    const user = await User.create(req.body);
    req.session.logged = true;
    req.session.userId;
    res.json({
      status: 200,
      data: JSON.stringify({
        user : user._id
      })
    });
  } catch(err){
    console.log(`Login failed. Error: ${err}`);
    res.send(`Login failed. Error: ${err}`);
  }
});

// ==========================
// TRACK A BILL
// ==========================
router.put('/:userid/track/:id', async (req, res) => {
  console.log(`Updating tracked bills for user: ${req.session.id}`)

  try {
    // ==========================
    // FIND THIS BILL AND ADD
    // ==========================
    const findThisBill = await Bills.findById(req.params.id);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userid, 
      { $push : { trackedBills : findThisBill } },
      );
    res.json({
      status: 200,
      data: 'user update successful'
    });
    console.log(`Untracked a bill, user info is now: ${updatedUser}`)
  } catch(err){
    console.log(err);
    res.send(err);
  }
});

// =========================
// UNTRACK A BILL
// =========================
router.put('/:userid/untrack/:id', async (req, res) => {
  // console.log(`Updating tracked bills for user: ${req.session.id}`)

  try {
    const findThisBill = await Bills.findById(req.params.id);
    // const allUsers = await User.find();
    // console.log(`Here are all the users:${JSON.stringify(allUsers)}`)
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userid, 
      { $pull : { trackedBills : findThisBill } },
      );
    res.json({
      status: 200,
      data: 'user update successful'
    });
    console.log(`Untracked a bill, user info is now: ${updatedUser}`)
  } catch(err){
    console.log(`Untracking bill failed. Error: ${err}`);
    res.send(`Untracking bill failed. Error: ${err}`);
  }
});

module.exports = router;