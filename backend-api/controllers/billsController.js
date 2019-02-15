const express = require('express');
const router = express.Router();
const Bill = require('../models/bill');

// FIND A BILL
 router.get('/findBill', async (req, res, next) => {
  console.log(`WE SENT ${req.body.title} AS THE TITLE TO CHECK`)

  try  {
  const thisBill = await Bill.findOne({ title : req.body.title });
    if (thisBill) {
      res.json({
        status: 200,
        message: 'FOUND BILL',
        data: thisBill
      });
    } else {
      res.json({
        status: 400,
        message: 'DIDNT FIND BILL',
      });
    }
  } catch (err){
    res.send(err)
  }
});

// EDIT ROUTE


// CREATE ROUTE
// router.post('/', async (req, res) => {
//   try {
    // console.log(req.body, ' this is req.body');
    // const createdMovie = await Movie.create(req.body);
    // console.log('response happening?')
    // res.json({
    //   status: 200,
    //   data: createdMovie
    // });
//   } catch(err){
//     console.log(err);
//     res.send(err);
//   }
// });

// SHOW ROUTE
router.get('/:id', async (req, res, next) => {
     try  {
        // const foundMovie = await Movie.findById(req.params.id);
        // res.json({
        //   status: 200,
        //   data: foundMovie
        // });
      } catch (err){
        res.send(err);
      }
});

// UPDATE ROUTE
router.put('/:id', async (req, res) => {
  try {
    // const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true});
    // res.json({
    //   status: 200,
    //   data: updatedMovie
    // });
  } catch(err){
    res.send(err)
  }
});

// DELETE ROUTE
router.delete('/:id', async (req, res) => {
  try {
    //  const deletedMovie = await Movie.findByIdAndRemove(req.params.id);
    //   res.json({
    //     status: 200,
    //     data: deletedMovie
    //   });
  } catch(err){
    res.send(err);
  }
});

module.exports = router;