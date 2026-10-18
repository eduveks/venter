import {_db, _out, _val} from "@netuno/server-types";

const dbActivities = _db.query(`
  SELECT
    category_root.uid AS "category_root_uid",
    category_root.name AS "category_root_name",
    category.uid AS "category_uid",
    category.name AS "category_name",
    activity.uid AS "activity_uid",
    activity.name AS "activity_name"
  FROM activity INNER JOIN category ON activity.id = category.id
    LEFT JOIN category AS category_root ON category.parent_id = category_root.id
  WHERE activity.active = TRUE
  ORDER BY category.name, activity.name
`);

const list = _val.list();

for (const dbActivity of dbActivities) {
  list.add(
    _val.map()
      .set(
        'category',
        _val.map()
          .set('parent', dbActivity.get('category_root_name'))
          .set('name', dbActivity.getString('category_name'))
      )
      .set('uid', dbActivity.getString('activity_uid'))
      .set('name', dbActivity.getString('activity_name'))
  )
}

_out.json(list);