import {_db, _out, _req, _val} from "@netuno/server-types";

const page = _req.getInt("page", 1);
const activity = _req.getString("activity");
const people = _req.getString("people");
const status = _req.getString("status");
const installment = _req.getInt("installment");
const interval = _req.getValues("interval", _val.list());

const pagePayments = _db.form('payment')
  .where(
    (installment > 0 ? _db.where("installment_number").equals(installment) : _db.where("id").notEqual(-1))
      .and(status === "waiting"
        ? _db.where("paid").notEqual(true).and(_db.where("due_date").greaterOrEqualsThan(_db.date()))
        : status === "overdue"
          ? _db.where("paid").notEqual(true).and(_db.where("due_date").lessThan(_db.date()))
          : status === "paid"
            ? _db.where("paid").equals(true)
            : _db.where("id").notEqual(-1))
      .and(
        !interval.isEmpty()
          ? _db.where("due_date").greaterOrEqualsThan(interval.getString(0)).and(_db.where("due_date").lessOrEqualsThan(interval.getString(1)))
          : _db.where("id").notEqual(-1)
      )
  )
  .join(
    (() => {
      const join = _db.manyToOne('member', 'member_id')
      join.join(_db.manyToOne('activity', 'activity_id', activity ? _db.where("uid").equals(activity) : _db.where("id").notEqual(-1)))
      join.join(_db.manyToOne('people', 'people_id', people ? _db.where("uid").equals(people) : _db.where("id").notEqual(-1)))
      return join
    })()
  )
  .get('people.name', 'people_name')
  .get('payment.due_date')
  .get('payment.amount')
  .get('payment.installment_number')
  .get('payment.installments_total')
  .get('payment.paid')
  .get('payment.paid_on')
  .get('activity.name', 'activity_name')
  .get('activity.date_start', 'activity_date_start')
  .get('activity.date_end', 'activity_date_end')
  .get('activity.price_regular', 'activity_price')
  .order('payment.due_date', 'desc')
  .debug(true)
  .page(_db.pagination(page, 5))

const payments = _val.list()

for (const dbPayment of pagePayments.getValues("items")) {
  payments.add(
    _val.map()
      .set('people_name', dbPayment.getString('people_name'))
      .set('activity_name', dbPayment.getString('activity_name'))
      .set('activity_date_start', dbPayment.getSQLDate('activity_date_start'))
      .set('activity_date_end', dbPayment.getSQLDate('activity_date_end'))
      .set('activity_price', dbPayment.getDouble('activity_price'))
      .set('due_date', dbPayment.getSQLDate('due_date'))
      .set('amount', dbPayment.getDouble('amount'))
      .set('installment_number', dbPayment.getInt('installment_number'))
      .set('installments_total', dbPayment.getInt('installments_total'))
      .set('paid', dbPayment.getBoolean('paid'))
      .set('paid_on', dbPayment.getSQLDate('paid_on'))
      .set('overdue', dbPayment.getSQLDate('due_date').compareTo(_db.date()) < 0)
  )
}

_out.json(
  _val.map()
    .set("items", payments)
    .set("total", pagePayments.getInt("totalElements"))
)
