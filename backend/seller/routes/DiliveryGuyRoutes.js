const express = require('express');
const router = express.Router();
const { getAcceptedOrders,updateOrderStatus,getAcceptedNormalOrders,updateNomalOrderStatus } = require('../controller/DiliveryGuyController');

router.get('/acceptedBlk', getAcceptedOrders);
router.get('/acceptedNor', getAcceptedNormalOrders);
router.patch('/update-status', updateOrderStatus);
router.patch('/update-status-N', updateNomalOrderStatus);


module.exports = router;
