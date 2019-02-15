const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Bills = require('../models/bill');
const bcrypt  = require('bcryptjs');

// =======================================================
// CREATE ROUTE (REGISTER USER)
// =======================================================
router.post('/register', async (req, res) => {
  console.log(`REGISTERING WITH: ${JSON.stringify(req.body)}`)
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.password = hashedPassword;
// ==========================
// CHECK IF USERNAME IS TAKEN
// ==========================
  try {
    const usernameTaken = await User.findOne({'username': userDbEntry.username});
// ==========================
// CREATE USER IF NOT TAKEN
// ==========================
    if (!usernameTaken) {
      const user = await User.create(userDbEntry);
      req.session.username = user.username;
      req.session.logged = true;
      req.session.userId = user._id;
      res.json({
        status: 200,
        data: JSON.stringify({
            session : req.session,
            userId: user._id,
            trackedBills: user.trackedBills
        })
      });  
    } else {
      console.log("USERNAME TAKEN.");
      res.json({
        status: 406,
        data: JSON.stringify({
          message : 'USERNAME TAKEN'})
      });  
    }
  } catch(err){
    console.log(`Login failed. Error: ${err}`);
    res.send(`Login failed. Error: ${err}`);
  }
});

// =======================================================
// LOGIN USER
// =======================================================
router.post('/login', async (req, res) => {
  console.log(`CURRENT SESSION: ${req.session}`);

  try {
    const foundUser = await User.findOne({'username': req.body.username});
    console.log(`FOUND USER: ${foundUser}`);
    console.log(`INFO SENT TO EXPRESS: ${req.body}`);

    if (foundUser){
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        console.log('PASSWORD CORRECT.');
        req.session.message = '';
        req.session.username = foundUser.username;
        req.session.logged = true;
        req.session.userId = foundUser._id;
        console.log(`STARTED SESSION: ${req.session}`);
        res.json({
          status: 200,
          data: JSON.stringify({
            session : req.session,
            userId: foundUser._id,
            trackedBills: foundUser.trackedBills
          })
        });
      } else {
        req.session.message = 'USERNAME/PASS INCORRECT';
        res.json({
          status: 406,
          data: JSON.stringify({
          message : 'USERNAME/PASS INCORRECT'})
        });  
      }
    } else {
      req.session.message = 'USERNAME/PASS INCORRECT';
      res.json({
        status: 406,
        data: JSON.stringify({
        message : 'USERNAME/PASS INCORRECT'})
      });  
    }
  } catch(err){
    res.send(err);
  }
});

// =======================================================
// LOGOUT USER
// =======================================================
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.send(err);
    } else {
      res.redirect('/');
    }
  });
});

// =======================================================
// TRACK A BILL
// =======================================================
router.put('/:userid/track/:id', async (req, res) => {
  console.log(`Updating tracked bills for user: ${req.session.id}`)

  try {
// ===============================================
// FIND THIS BILL AND ADD, ! IF NOT YET TRACKING !
// ===============================================
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
        data: {
          _id: req.params.id,
          message: 'UNTRACKED BILL SUCCESS'
        }
      });
    })
  } catch(err){
    console.log(`Untracking bill failed. Error: ${err}`);
    res.send(`Untracking bill failed. Error: ${err}`);
  }
});

module.exports = router;