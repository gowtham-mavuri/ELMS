var express = require('express');
var router = express.Router();
var utils = require('../utils');

//import Controllers
var adm= require('../controllers/adminController');
var branch=require('../controllers/branchController');
var dept = require('../controllers/departmentController');
var emp = require('../controllers/employeeController');
var request = require('../controllers/requestController');
var holiday = require('../controllers/holidaysController');

//to fetch branches doest require token
router.get('/fetchBranches',branch.branch_list);
router.post('/PopulationBranches',utils.verifyToken,branch.branch_list_pop);
router.get('/:email',utils.verifyToken,adm.admin_email);
router.post('/branches',utils.verifyToken,branch.branch_list);
router.post('/branch',utils.verifyToken,branch.branch_id);
router.post('/branchUpdate',utils.verifyToken,branch.put_branch);
router.post('/branchAdd',utils.verifyToken,branch.post_branch);
router.post('/branchDel',utils.verifyToken,branch.del_branch);
router.post('/holidays',utils.verifyToken,holiday.add);
router.post('/holidaysGet',utils.verifyToken,holiday.fetch);
router.post('/holidaysDel',utils.verifyToken,holiday.del);
router.post('/deptAdd',utils.verifyToken,dept.add_department);
router.post('/depts',utils.verifyToken,dept.department_list_all);
router.post('/dept',utils.verifyToken,dept.department_list);
router.post('/emps',utils.verifyToken,emp.emp_list_all);
router.post('/totalEmps',utils.verifyToken,emp.emp_count_all);

router.post('/reqUpdate',utils.verifyToken,request.put_request_admin);
router.post('/reqs',utils.verifyToken,request.request_list_all_pending);
router.post('/reqsToday',utils.verifyToken,request.request_list_all_today);

module.exports = router;