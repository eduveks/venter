import {_db, _exec, _header, _out, _req, _time, _val} from '@netuno/server-types'

import people from "#core/lib/people.js";

let dbActivity = _db.get('activity', _req.getString('uid'))

if (!dbActivity) {
    _header.status(404)
    _exec.stop()
}

const between = _time.periodBetween(_time.localDate(), dbActivity.getLocalDate("date_start"))

let installments = between.getMonths()

if (installments >= 1) {
    installments++
}

const dbPeople = people.getLogged()

const dbMemberInserted = _db.form('member')
    .set('activity_id', dbActivity.getInt('id'))
    .set('people_id', dbPeople.getInt('id'))
    .set('installments', installments)
    .set('since', _db.date())
    .insert()

const price = people.isTeacher() ? dbActivity.getDouble('price_teacher') : dbActivity.getDouble('price_regular')

const amount = (price / installments)

for (let i = 0; i < installments; i++) {
    _db.form('payment')
        .set('member_id', dbMemberInserted.getInt('id'))
        .set('amount', amount)
        .set('due_date', _db.date(_time.localDate().plusMonths(i)))
        .set('installment_number', i + 1)
        .set('installments_total', installments)
        .insert()
}

_out.json(
    _val.map()
        .set('result', true)
)
