const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUser);
router.post('/add', userController.addUser);
router.post('/edit', userController.updateUser);
router.post('/delete', userController.deleteUser);
router.get('/countApi',userController.getTotalCount);


module.exports = router;
