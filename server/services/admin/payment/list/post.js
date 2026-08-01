import {_db, _out, _val} from "@netuno/server-types";

const dbPayments = _db.form('payment')
  .join(
    (() => {
      const join = _db.manyToOne('member', 'member_id')
      join.join(_db.manyToOne('activity', 'activity_id'))
      join.join(_db.manyToOne('people', 'people_id'))
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
  .all()

const payments = _val.list()

for (const dbPayment of dbPayments) {
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
  )
}

_out.json(payments)
