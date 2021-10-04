const alertModel = require('../models/alertModel');
const { Op } = require('sequelize');
const sequelize = require('../config/db');
const asyncHandler = require('../middleware/asyncHandlerError');

exports.getAlertsCount = asyncHandler(async () => {
  const result = await alertModel.count();
  return result;
});
exports.getAllAlerts = asyncHandler(async (searchTerm, page) => {
  const itemsPerPage = 20;

  page = page || 1;
  searchTerm = searchTerm || '';
  result = await alertModel.findAndCountAll({
    offset: (page - 1) * itemsPerPage,
    limit: itemsPerPage,
    where: {
      [Op.or]: [
        {
          server: {
            [Op.eq]: searchTerm,
          },
        },
        {
          description: {
            [Op.substring]: searchTerm,
          },
        },
      ],
    },
  });

  return {
    pages: Math.ceil(result.count / itemsPerPage),
    data: result.rows,
    currentPage: page,
  };
});

exports.createAlert = asyncHandler(async (alert) => {
  return await alertModel.create(alert);
});

exports.getOneAlertById = asyncHandler(async (id) => {
  return await alertModel.findOne({
    where: {
      id,
    },
  });
});

exports.metrics = asyncHandler(async () => {
  const currentDate = new Date();
  const res = await alertModel.findAll({
    attributes: [
      'server',
      [sequelize.fn('COUNT', sequelize.col('server')), 'count'],
    ],
    group: 'server',
    order: [[sequelize.fn('COUNT', sequelize.col('server')), 'DESC']],
    where: {
      createdAt: {
        [Op.gte]: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        ),
        [Op.lt]: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          1
        ),
      },
    },
    limit: 3,
  });
  return res;
});
