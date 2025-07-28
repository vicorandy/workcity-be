const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');
const { createClient, getClients } = require('../controllers/client.controller');

router.use(auth);
router.post('/', role(['admin','user']), createClient);
router.get('/', getClients);

module.exports = router;
