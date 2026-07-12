import {_db, _exec, _header, _out, _req, _storage} from '@netuno/server-types'

let dbActivity = null

if (_req.getString('uid')) {
    dbActivity = _db.get('activity', _req.getString('uid'))
}

if (!dbActivity) {
    _header.status(404)
    _exec.stop()
}

const dbItineraryName = dbActivity?.getString('itinerary')

const storageItinerary = _storage.database(
    'activity',
    'itinerary',
    dbItineraryName
)

_header.contentTypePDF()
_header.noCache()

_out.copy(storageItinerary.inputStream())