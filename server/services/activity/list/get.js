import {_db, _exec, _header, _out, _req, _val} from '@netuno/server-types'

import people from '#core/lib/people.js'

const dbRootCategory = _db.form('category')
    .where(
        _db.where('code').equals(_req.getString('type'))
    )
    .order('name', 'asc')
    .first()

if (!dbRootCategory) {
    _header.status(404)
    _out.json({ error: 'category-not-found'})
    _exec.stop()
}

const dbActivities = _db.query(`
    SELECT activity.*,
        (SELECT id FROM member WHERE activity_id = activity.id AND people_id = ? LIMIT 1) AS member_id
    FROM activity
    WHERE activity.active = TRUE
        AND activity.date_start >= CURRENT_DATE
        AND (category_id = ?
            OR category_id IN (SELECT id FROM category WHERE parent_id = ?)
        )
    ORDER BY activity.date_start
`, people.getLogged().getInt('id'), dbRootCategory.getInt('id'), dbRootCategory.getInt('id'))

const activities = _val.list()

for (const dbActivity of dbActivities) {
    activities.add(
        _val.map()
            .set('uid', dbActivity.getString('uid'))
            .set('name', dbActivity.getString('name'))
            .set('description', dbActivity.getString('description'))
            .set('date_start', dbActivity.getSQLDate('date_start'))
            .set('date_end', dbActivity.getSQLDate('date_end'))
            .set('price',  people.isTeacher() ? dbActivity.getFloat('price_teacher') : dbActivity.getFloat('price_regular'))
            .set('is_member', dbActivity.getInt('member_id') > 0)
    )
}

_out.json(activities)
