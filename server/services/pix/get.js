import {_header, _out, _storage} from "@netuno/server-types";

const image = _storage.filesystem("server", "pix.png");

_header.contentTypePNG()
_header.noCache()

if (image.file().exists()) {
    _out.copy(image.inputStream())
}
