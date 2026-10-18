import {_db, _exec, _header, _out, _req, _time, _val} from '@netuno/server-types'

import people from '#core/lib/people.js'

const dbActivity = _db.get('activity', _req.getString('uid'))

if (!dbActivity) {
    _header.status(404)
    _exec.stop()
}

const between = _time.periodBetween(_time.localDate(), dbActivity.getLocalDate("date_start"))

let installments = between.getMonths()

if (installments >= 1) {
    installments++
}

const price = people.isTeacher() ? dbActivity.getDouble('price_teacher') : dbActivity.getDouble('price_regular')

const amount = (price / installments)

_out.json(
    _val.map()
        .set('startdate', dbActivity.getLocalDate("date_start"))
        .set("amount", amount)
        .set("installments", installments)
)


