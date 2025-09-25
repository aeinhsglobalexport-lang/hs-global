const path = require('path');
const Loki = require('lokijs');

const dbPath = path.join(__dirname, 'data.json');
const db = new Loki(dbPath, {
  autosave: true,
  autosaveInterval: 2000,
  autoload: true,
  autoloadCallback: init,
});

let orders, payments;

function init() {
  orders = db.getCollection('orders') || db.addCollection('orders', { unique: ['id'] });
  payments = db.getCollection('payments') || db.addCollection('payments', { unique: ['id'] });
}

function insertOrder(order) {
  if (!orders) init();
  const exists = orders.by('id', order.id);
  if (exists) {
    orders.findAndUpdate({ id: order.id }, (o) => Object.assign(o, order));
  } else {
    orders.insert(order);
  }
  db.saveDatabase();
}

function updateOrderStatus(id, status) {
  if (!orders) init();
  orders.findAndUpdate({ id }, (o) => { o.status = status; });
  db.saveDatabase();
}

function insertPayment(payment) {
  if (!payments) init();
  const exists = payments.by('id', payment.id);
  if (exists) {
    payments.findAndUpdate({ id: payment.id }, (p) => Object.assign(p, payment));
  } else {
    payments.insert(payment);
  }
  db.saveDatabase();
}

module.exports = {
  insertOrder,
  updateOrderStatus,
  insertPayment,
};






