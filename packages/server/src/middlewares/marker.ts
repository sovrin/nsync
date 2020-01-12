import {eid} from "../utils";

/**
 *
 */
const factory = () => {

    /**
     *
     */
    return async (req, res, next) => {
        req.id = eid();

        next();
    }
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.01.2020
 * Time: 19:47
 */
export default factory;