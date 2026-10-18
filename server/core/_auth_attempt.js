import {_auth, _req, _user, _val} from "@netuno/server-types";

const username = _req.getString('username');

const dbUser = _user.firstByUser(username);

// _log.info(_req.getString('myparameter'))

if (dbUser && dbUser.getString('code') === 'blocked') {
  _auth.attemptRejectWithData(_val.map().set('custom-blocked', true));
}
