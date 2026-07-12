import {_db, _exec, _header, _out, _req, _storage} from '@netuno/server-types'

let dbActivity = null

if (_req.getString('uid')) {
    dbActivity = _db.get('activity', _req.getString('uid'))
}

if (!dbActivity) {
    _header.status(404)
    _exec.stop()
}

const dbCoverName = dbActivity?.getString('cover')

const storageCover = _storage.database(
    'activity',
    'cover',
    dbCoverName
)

if (storageCover.extension() === "jpg" || storageCover.extension() === "jpeg") {
    _header.contentTypeJPG()
} else {
    _header.contentTypePNG()
}
_header.noCache()

_out.copy(storageCover.inputStream())