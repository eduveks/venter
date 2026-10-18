import {_db, _out, _val} from '@netuno/server-types'

import people from '#core/lib/people.js'

const dbActivities = _db.form('activity')
    .link(
        'member',
        _db.where('people_id').equal(people.getLogged().getInt('id'))
    )
    .link('category')
    .get('category.name', 'category_name')
    .get('activity.uid', 'uid')
    .get('activity.name', 'name')
    .get('activity.date_start', 'date_start')
    .get('activity.date_end', 'date_end')
    .get('activity.price_regular', 'price_regular')
    .get('activity.price_teacher', 'price_teacher')
    .get('activity.description', 'description')
    .get('member.since', 'member_since')
    .order('activity.date_start', 'desc')
    .debug(true)
    .all()

const activities = _val.list()

for (const dbActivity of dbActivities) {
    activities.add(
        _val.map()
            .set('category_name', dbActivity.getString('category_name'))
            .set('uid', dbActivity.getString('uid'))
            .set('name', dbActivity.getString('name'))
            .set('description', dbActivity.getString('description'))
            .set('date_start', dbActivity.getSQLDate('date_start'))
            .set('date_end', dbActivity.getSQLDate('date_end'))
            .set('price',  people.isTeacher() ? dbActivity.getFloat('price_teacher') : dbActivity.getFloat('price_regular'))
            .set('member_since', dbActivity.getSQLDate('member_since'))
    )
}

_out.json(activities)
