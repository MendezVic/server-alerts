const {
  getAlertsCount,
  getAllAlerts,
  createAlert,
  getOneAlertById,
  metrics,
} = require('../services/alertService');

const asyncHandler = require('../middleware/asyncHandlerError');
const ErrorResponse = require('../utils/errorResponse');

/**
 * desc Get all alerts
 * route GET /api/v1/alerts
 * access public
 */
exports.getAllAlerts = asyncHandler(async (req, res, next) => {
  const { searchTerm, page } = req.query;
  const count = await getAlertsCount();
  console.log(count);
  if (count > 0) {
    const alerts = await getAllAlerts(searchTerm, page);

    if (alerts.data.length === 0) {
      return next(
        new ErrorResponse(
          `There are no alerts for the search: ${searchTerm}`,
          404
        )
      );
    }
    res.json(alerts).status(200);
  } else {
    return next(new ErrorResponse('There are no alerts in the database'), 404);
  }
});

/**
 * desc Get One alert by id
 * route GET /api/v1/alerts/:id
 * access public
 */
exports.getOneAlert = asyncHandler(async (req, res, next) => {
  const alert = await getOneAlertById(req.params.id);

  if (!alert) {
    return next(
      new ErrorResponse(
        `The alert with the ID: ${req.params.id} was not found`,
        404
      )
    );
  }
  res.json(alert).status(200);
});

/**
 * desc Create an alert
 * route POST /api/v1/alerts
 * access public
 */
exports.postAlert = asyncHandler(async (req, res, next) => {
  if (!req.body) {
    return next(new ErrorResponse('Body not found', 400));
  }

  const alert = await createAlert(req.body);

  res.json(alert).status(200);
});

/**
 * desc Get servers with most alerts
 * route GET /api/v1/alerts/metrics
 * access public
 */
exports.getMetrics = asyncHandler(async (req, res, next) => {
  const alerts = await metrics();

  res.json(alerts).status(200);
});
