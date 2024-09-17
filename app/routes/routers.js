const express = require('express');
const router = express.Router();

const customers = require('../controllers/customer.controller.js');
const employees = require('../controllers/employees.controller.js');
const canciones = require('../controllers/canciones.controller.js');

// Customer routes
router.post('/api/customers/create', customers.create);
router.get('/api/customers/all', customers.retrieveAllCustomers);
router.get('/api/customers/onebyid/:id', customers.getCustomerById);
router.get('/api/customers/filteringbyage', customers.filteringByAge);
router.get('/api/customers/pagination', customers.pagination);
router.get('/api/customers/pagefiltersort', customers.pagingfilteringsorting);
router.put('/api/customers/update/:id', customers.updateById);
router.delete('/api/customers/delete/:id', customers.deleteById);

// Employee routes
router.post('/api/employees/create', employees.create);
router.get('/api/employees/all', employees.retrieveAllEmployees);
router.get('/api/employees/onebyid/:id', employees.getEmployeeById);
router.put('/api/employees/update/:id', employees.updateById);
router.delete('/api/employees/delete/:id', employees.deleteById);

//Plantilla routes
/*
router.post('/create', products.create);
router.get('/all', products.findAll);
router.get('/onebyid/:id', products.findOne);
router.put('/update/:id', products.update);
router.delete('/delete/:id', products.delete);

*/


router.post('/api/canciones/create', canciones.create);
router.put('/api/canciones/update/:id', canciones.updateById);
router.delete('/api/canciones/delete/:id', canciones.deleteById);
router.get('/api/canciones/all', canciones.retrieveAllCanciones);
router.get('/api/canciones/byartist', canciones.retrieveCancionesByArtist);

module.exports = router;
