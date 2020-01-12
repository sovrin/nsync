import {send} from 'micro';
import {release} from '../container';
import Dispatcher from "../types/Dispatcher";

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
 *
 * @param req
 * @param res
 */
const factory = (req, res): Dispatcher => {

    /**
     *
     * @param status
     * @param payload
     */
    const dispatch = (status: number, payload?: any): Promise<void> => {
        release(req);

        return send(res, status, payload);
    };

    return {
        dispatch,
    }
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.01.2020
 * Time: 19:01
 */
export default factory;