const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');
const {
  createProject,
  updateProject,
  getProjectsByClient,
} = require('../controllers/project.controller');

router.use(auth);
router.post('/', role(['admin']), createProject);
router.put('/:id', role(['admin']), updateProject);
router.get('/client/:clientId', getProjectsByClient);

module.exports = router;
