import util from "util";
import DBG from "debug";

const debug = DBG("fast-shopping:handle-debug");
const flush = DBG("fast-shopping:handle-error");
debug.useColors = true;
flush.useColors = true;

const _404 = (req, res, next) => {
    res.status(404).json({
        title: `404 NOT FOUND`,
        message: `This requested page does not exist in here!`
    });
};

const _505 = (err, req, res, next) => {
    util.log(err.message);
    flush(`${err.status || 500} \n Message: ${err.message}`);
    res.status(err.status || 500).json({
        message: err.message,
        err: {}
    });
};

export { _404, _505 };
