import {_group, _val} from "@netuno/server-types";

_group.createIfNotExists(
  _val.map()
    .set("name", "Normal")
    .set("code", "normal")
    .set("login_allowed", false)
);

_group.createIfNotExists(
  _val.map()
    .set("name", "Professor")
    .set("code", "teacher")
    .set("login_allowed", false)
);
