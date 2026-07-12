import {_db, _out, _val,} from '@netuno/server-types'

import people from '#core/lib/people.js'

const dbPeople = people.getLogged()

const dbPayment = _db.form('payment')
    .where(_db.where('paid').equal(false))
    .link(
        'member',
        _db.where('people_id').equal(people.getLogged().getInt('id')),
        _db.link('activity')
    )
    .get('payment.due_date')
    .get('payment.amount')
    .get('payment.installment_number')
    .get('payment.installments_total')
    .get('activity.name', 'activity_name')
    .get('activity.date_start', 'activity_date_start')
    .get('activity.date_end', 'activity_date_end')
    .order('payment.due_date', 'asc')
    .limit(1)
    .first()

_out.json(
    _val.map()
        .set('activity_name', dbPayment.getString('activity_name'))
        .set('activity_date_start', dbPayment.getSQLDate('activity_date_start'))
        .set('activity_date_end', dbPayment.getSQLDate('activity_date_end'))
        .set('due_date', dbPayment.getSQLDate('due_date'))
        .set('amount', dbPayment.getDouble('amount'))
        .set('installment_number', dbPayment.getInt('installment_number'))
        .set('installments_total', dbPayment.getInt('installments_total'))
)

