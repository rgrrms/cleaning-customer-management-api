import { Router } from 'express';
import { listCustomers, createCustomers, routesToCustomers } from '../controllers/customersController.js';

const router = Router();

router.get('/', listCustomers);

router.post('/', createCustomers);

router.get('/routes', routesToCustomers)

export default router;
