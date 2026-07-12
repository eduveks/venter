import {_db, _time} from "@netuno/server-types";

const date = _time.localDate().minusDays(20);

const dbPayments = _db.form('payment')
    .where(
        _db.where("due_date").greaterOrEqualsThan(date)
            .and(_db.where("paid").equal(false))
    )
    .link('member', _db.link('activity'))
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

for (const dbPayment of dbPayments) {
    _out.println(dbPayment.getString("payment.due_date") + "<br>")
}