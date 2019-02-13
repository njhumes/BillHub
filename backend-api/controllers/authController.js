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
    // ================================================
    // FIND THIS BILL AND ADD, ! IF NOT YET TRACKING !
    // ================================================
    const findThisBill = await Bills.findById(req.params.id);
    const alreadyTracking = await User.findOne(
      { '_id' : req.params.userid , 
      'trackedBills._id' : req.params.id
      },
    );
    if (!alreadyTracking) {
      const updatedUser = await User.findByIdAndUpdate(
      req.params.userid, 
      { $push : { trackedBills : findThisBill } },
      );
      res.json({
        status: 200,
        data: 'user update successful'
      });
      console.log(`Tracking this bill, user info is now: ${updatedUser}`)
    } else {
      res.json({
        status: 401,
        data: {
          text: 'user already tracking',
          alreadyTracking: alreadyTracking,
          idSent: req.params.id
        }
      });
      console.log(`User is already tracking this bill...`)
    }
  } catch(err){
    console.log(err);
    res.send(err);
  }
});

// =================================================
// UNTRACK A BILL
// =================================================
router.put('/:userid/untrack/:id', async (req, res) => {
  // Troubleshooting Input
  console.log(`TRYING TO UNTRACK BILL ${req.params.id} FROM USER ${req.params.userid}...`)

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userid,
        "trackedBills._id" : req.params.id }, 
      { $pull:  { 
        "trackedBills": {
          _id: req.params.id} 
      }},
    { upsert:false,
      new:true
    }, function(err, product){
      console.log(`AFTER UNTRACKING, USER STILL TRACKS ${product}...`)
      if (err) {
        return res.json({
          status: 404,
          data: 'UNTRACKED BILL FAILED'
        });
      }
      return res.json({
        status: 200,
        data: 'UNTRACKED BILL SUCCESS'
      });
    })
  } catch(err){
    console.log(`Untracking bill failed. Error: ${err}`);
    res.send(`Untracking bill failed. Error: ${err}`);
  }
});

module.exports = router;