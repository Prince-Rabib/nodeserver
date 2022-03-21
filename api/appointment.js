const express = require('express');
const router = express.Router();
const Appointment = require('../model/appointment');
const { check, validationResult } = require('express-Validator');

router.get('/', async(req, res) => {

  try {    
    const appointment = await Appointment.find();
    res.json(appointment)
    
  }catch (error) {
    console.error(error.message);
  }
     
});

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('phone', '12 degit phone number is required').not().isEmpty().isLength({ min: 11 }),
    check('car', 'Insert your car license number').not().isEmpty().isLength({ max: 8 }),
    check('car_engine', 'Insert your car engine number').not().isEmpty().isLength({ max: 8 }),
    check('address', 'Input your address ').not().isEmpty(),
    check('mechanic', 'Select your mechanic').not().isEmpty(),
    check('date', 'Date is required').not().isEmpty(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({error: errors.array()});
    }

    const { name, phone, car, address, car_engine, mechanic, date} = req.body;

    try {
      let appointment = new Appointment({
        name,
        phone,
        car,
        car_engine,
        address,
        mechanic,
        date
      });
      if(mechanic == " " || mechanic == "Choose Your Mechanic"){
          res.status(400).json({msg:"Select your Mechanic"})
      }
      const mechanic_name  = mechanic;
      const appointment_date = date;
      const check = await Appointment.find({ mechanic: mechanic_name, date: appointment_date }).exec();

      


      if(check.length < 4){
          await appointment.save();
          res.json({"done":"complete"});
        }
      
      res.status(400).json({msg:"Mechanic is not available at this date"});
    } catch (err) {
      console.error(err.message);
    }
  }
);

router.post(
  '/update',
  [
    check('mechanic', 'Select your mechanic').not().isEmpty(),
    check('date', 'Date is required').not().isEmpty(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({error: errors.array()});
    }

    const {mechanic, date, id} = req.body;
    console.log(mechanic+" "+ date+" "+id);

    try {

      const mechanic_name  = mechanic;
      const appointment_date = date;
      const check = await Appointment.find({ mechanic: mechanic_name, date: appointment_date }).exec();

      
    

      if(check.length < 4){
          const filter = { _id: id };

        let doc = await Appointment.findOne(filter);

        // This will update `doc` age to `59`, even though the doc changed.
        doc.mechanic = mechanic_name;
        doc.date = appointment_date;
        await doc.save();


          res.json({"done":"complete"});
        }
      
      res.status(400).json({msg:"Mechanic is not available at this date"});
      
    } catch (err) {
      console.error(err.message);
    }
  }
);


module.exports = router;
