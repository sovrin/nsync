import {send} from "micro";
import Req from "../types/Req";
import Res from "../types/Res";

export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 503,
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 05.03.2020
 * Time: 19:26
 */
export default () => {

    return (req: Req, res: Res, next) => {
        res.local.dispatch = (status, payload) => send(res, status, payload);

        next();
    }
}