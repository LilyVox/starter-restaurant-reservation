const service = require('./reservations.service');
const asyncErrorHandler = require('../errors/asyncErrorHandler');

function verifyDateFormat(req, res, next) {
  if (req.query?.date) {
    let { date } = req.query;
    console.info(`date captured is ${date} type ${typeof date}`);
    if (typeof date === 'string' && date.match(/(^\d{4}\-\d{2}\-\d{2})/)) {
      res.locals.date = date;
      return next();
    } else next({ status: 400, message: 'Invalid date format.' });
  } else {
    next();
  }
}

function verifyDate(req, res, next) {
  const reservation = res.locals.reservation;
  const reservationDate = new Date(
    `${reservation.reservation_date}T${reservation.reservation_time}:00.000`
  );
  const today = new Date();

  if (reservationDate.getDay() === 2) {
    return next({
      status: 400,
      message: "'reservation_date' field: restaurant is closed on tuesday",
    });
  }

  if (reservationDate < today) {
    return next({
      status: 400,
      message: "'reservation_date' and 'reservation_time' field must be in the future",
    });
  }

  if (
    reservationDate.getHours() < 10 ||
    (reservationDate.getHours() === 10 && reservationDate.getMinutes() < 30)
  ) {
    return next({
      status: 400,
      message: "'reservation_time' field: restaurant is not open until 10:30AM",
    });
  }

  if (
    reservationDate.getHours() > 22 ||
    (reservationDate.getHours() === 22 && reservationDate.getMinutes() >= 30)
  ) {
    return next({
      status: 400,
      message: "'reservation_time' field: restaurant is closed after 10:30PM",
    });
  }

  if (
    reservationDate.getHours() > 21 ||
    (reservationDate.getHours() === 21 && reservationDate.getMinutes() > 30)
  ) {
    return next({
      status: 400,
      message:
        "'reservation_time' field: reservation must be made at least an hour before closing (10:30PM)",
    });
  }
  res.locals.date = reservationDate;
  next();
}
function verifyCapturedData(req, res, next) {
  let { data } = req.body;
  if (!data) return next({ status: 400, message: 'Body must include a data object' });
  const neededFields = [
    'first_name',
    'last_name',
    'mobile_number',
    'reservation_time',
    'reservation_date',
  ];
  for (let field of neededFields) {
    if (!data.hasOwnProperty(field) || data[field] === '') {
      return next({ status: 400, message: `Field required: ${field}` });
    }
  }
  let testDate = Date.parse(`${data.reservation_date} ${data.reservation_time}`);
  if (Number.isNaN(testDate)) {
    return next({
      status: 400,
      message: 'reservation_date or reservation_time field is in an incorrect format',
    });
  }
  if (typeof data.people !== 'number')
    return next({ status: 400, message: 'people field must be a number' });
  if (data.people < 1) return next({ status: 400, message: 'people field must be at least 1' });
  if (data.status && data.status !== 'booked')
    return next({ status: 400, message: 'status can only be booked when booking' });

  res.locals.reservation = data;
  next();
}
async function isValidID(req, res, next) {
  let reservation_id = Number(req.params.reservation_id);
  if (!reservation_id) {
    reservation_id = req.body.data?.reservation_id;
    if (!reservation_id) return next({ status: 400, message: 'reservation_id not received' });
  }
  let reservation = await service.read(reservation_id);
  if (!reservation)
    return next({ status: 404, message: `Reservation ${reservation_id} not found in database` });
  res.locals.reservation_id = reservation_id;
  res.locals.reservation = reservation;
  next();
}
function preUpdateStatus(req, res, next) {
  const { data } = req.body;
  if (!data) return next({ status: 400, message: 'Body must include a data object' });
  if (!data.status) return next({ status: 400, message: 'no status update' });
  let status = res.locals.reservation.status;
  if (status === data.status) {
    return next({ status: 400, message: `status is already ${res.locals.reservation.status}` });
  }
  if (status === 'finished')
    return next({ status: 400, message: 'cannot modify a finished order' });
  if (data.status !== 'seated' || data.status !== 'finished')
    return next({ status: 400, message: `Unknown or invalid status: ${data.status}` });
  res.locals.status = data.status;
  return next();
}

/**
 * List handler for reservation resources
 * @returns a list of reservations to the client
 */
async function list(req, res, next) {
  if (req.query?.date) next();
  else {
    const data = await service.list();
    res.status(200).json({ data });
  }
  return;
}

function read(req, res) {
  res.status(200).json({ data: res.locals.reservation });
}
/**
 * List handler for a specific date
 *
 * is in the pipeline after list()
 */
async function listByDate(req, res) {
  const theDate = res.locals.date;
  const data = await service.listByDate(theDate);
  res.status(200).json({ data });
  return;
}
/**
 * Posts to DB a new reservation
 * after field verification
 */
async function createReservation(req, res) {
  const returning = await service.create(res.locals.reservation);
  res.status(201).json({ data: returning[0] });
}

async function updateStatus(req, res, next) {
  await service.updateStatus(res.locals.reservation_id, res.locals.status);
  res.sendStatus(200);
}

module.exports = {
  list: [asyncErrorHandler(list), verifyDateFormat, asyncErrorHandler(listByDate)],
  create: [verifyCapturedData, verifyDate, asyncErrorHandler(createReservation)],
  read: [asyncErrorHandler(isValidID), read],
  isValidID,
  statusUpdate: [asyncErrorHandler(isValidID), preUpdateStatus, updateStatus],
};
