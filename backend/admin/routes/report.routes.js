const express = require('express');
const router = express.Router();
const {
    getAllQuestionsForExcel,
    getUserForExcel,
    getSalse,
    getSalesForExcel,
    getBulkOrdersOverTime,
    getBulkOrdersForExcel,
    getBulkOrdersForFilter,

} = require('../controller/report.controller');

router.get('/questions/excel', getAllQuestionsForExcel);

// user info excel
router.get('/user-data/excel', getUserForExcel);
// get sales
router.get('/sales/over-time', getSalse);
// get sales for excel
router.get('/sales/over-time/excel', getSalesForExcel);
// get bulk order 
router.get('/bulk-orders/over-time', getBulkOrdersOverTime);
// get bulk orders for excel
router.get('/bulk-orders-excel', getBulkOrdersForExcel);
// get bulk order filter
router.get('/bulk-orders-filter', getBulkOrdersForFilter);


module.exports = router;