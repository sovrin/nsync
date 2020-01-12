import {register} from "../container";
import receiver from "../services/receiver";

const METHODS = [
    'POST',
    'PUT'
];

/**
 *
 */
const factory = () => {

    /**
     *
     */
    return async (req, res, next) => {
        const {url, method} = req;

        if (METHODS.includes(method) && url === "/upload") {
            const upload = await receiver(req);

            register(req, 'upload', upload);
        }

        next();
    }
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 10.01.2020
 * Time: 19:26
 */
export default factory;