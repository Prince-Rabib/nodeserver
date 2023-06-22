const express = require('express');
const router = express.Router();
const Mechanic = require('../model/mechanics');
const { check, validationResult } = require('express-validator');

router.get('/', (req, res) => {
  res.send('User users');
});

router.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
    check('stocks', 'Insert how many cars he/she can manage').isLength({ min: 1 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { name, stocks} = req.body;

    try {

      let mechanic = new Mechanic({
        name,
        stocks
      });

      await mechanic.save();
      res.json({"message":"done"});

    } catch (err) {
      console.error(err.message);
    }
  }
);

module.exports = router;
