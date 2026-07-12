import {_db, _user} from '@netuno/server-types'

export default {
    getLogged: () => {
        return _db.form("people")
            .where(_db.where("people_user_id").equal(_user.id))
            .first()
    },
    getByUID: (uid) => {
        return _db.form("people")
            .where(_db.where("uid").equal(uid))
            .first()
    }
}