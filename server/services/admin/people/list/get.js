import {_db, _out, _val} from "@netuno/server-types";

const dbPeople = _db.query(`
  SELECT
    people.uid,
    people.name,
    netuno_group.name AS "group"
  FROM people
    INNER JOIN netuno_user ON people.people_user_id = netuno_user.id
    INNER JOIN netuno_group ON netuno_user.group_id = netuno_group.id
  WHERE
    people.active = TRUE
  ORDER BY people.name
`);

const list = _val.list();

for (const dbPerson of dbPeople) {
  list.add(
    _val.map()
      .set('uid', dbPerson.getString('uid'))
      .set('name', dbPerson.getString('name'))
      .set('group', dbPerson.getString('group'))
  )
}

_out.json(list);