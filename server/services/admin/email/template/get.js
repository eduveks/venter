import {_out, _req, _storage, _val} from "@netuno/server-types";

const type = _req.getString("type");

const storageFile = _storage.filesystem("server", "email/template", type +".txt")
  .ensurePath();

_out.json(
  _val.map()
    .set("result", true)
    .set("content", storageFile.file().exists() ? storageFile.input().readAllAndClose() : "")
);