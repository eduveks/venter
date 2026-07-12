
let _api = null;

export default {
    api: (...args) => {
        if (args.length > 0) {
            _api = args[0];
        }
        return _api;
    },
    serviceFail({message, description}) {
        _api.warning({message, description});
    },
    success({message, description}) {
        _api.success({message, description});
    },
    info({message, description}) {
        _api.info({message, description});
    },
    warning({message, description}) {
        _api.warning({message, description});
    },
    error({message, description}) {
        _api.error({message, description});
    }
};
