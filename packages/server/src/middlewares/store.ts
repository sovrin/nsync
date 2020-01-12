import {register} from "../container";
import storeFactory from "../services/store";

/**
 *
 */
const factory = (path) => {
    const store = storeFactory(path);

    /**
     *
     */
    return async (req, res, next) => {
        register(req, 'store', store);

        next();
    }
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 10.01.2020
 * Time: 19:26
 */
export default factory;