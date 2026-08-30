import {_out, _req, _storage, _val} from "@netuno/server-types";

const type = _req.getString("type");
const content = _req.getString("content");

const storageFile = _storage.filesystem("server", "email/template", type +".txt")
  .ensurePath()

storageFile.output().printAndClose(content);

_out.json(
  _val.map()
    .set("result", true)
);
