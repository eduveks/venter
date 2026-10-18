import {_db, _group, _user} from '@netuno/server-types'

export default {
    getLogged: () => {
        return _db.form("people")
            .where(_db.where("people_user_id").equal(_user.id))
            .first();
    },
    getByUID: (uid) => {
        return _db.form("people")
            .where(_db.where("uid").equal(uid))
            .first();
    },
    isTeacher: ()=> {
      return _group.code() === 'teacher';
    }
}