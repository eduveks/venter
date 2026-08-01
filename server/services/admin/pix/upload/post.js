import {_exec, _header, _out, _req, _storage, _val} from "@netuno/server-types";

const file = _req.getFile("file");

if (!file.isExtension("png")) {
    _header.status(406);
    _out.json(
        _val.map()
            .set("error", "file-extension")
            .set("result", false)
    );
    _exec.stop();
}

file.save(_storage.filesystem("server", "pix.png"));

_out.json(
    _val.map()
        .set("result", true)
);
