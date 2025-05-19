const express = require('express');
const router = express.Router();

const {
    createCheckoutSession
  }  = require( "../controller/paymentStripeController");

const {getPayment}  = require('../controller/getPaymentStripe')


// Route to get all crops filtered by category
router.post('/', createCheckoutSession);
router.get('/getdetails/:sessionId', getPayment);

module.exports = router;
