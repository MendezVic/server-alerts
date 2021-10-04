const {
  getAllAlerts,
  postAlert,
  getOneAlert,
  getMetrics,
} = require('../controllers/alertController');
const router = require('express').Router();

router.route('/').get(getAllAlerts).post(postAlert);
router.route('/metrics').get(getMetrics);
router.route('/:id').get(getOneAlert);

module.exports = router;
