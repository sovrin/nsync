import Req from "../types/Req";
import Res from "../types/Res";

/**
 *
 */
const factory = () => {

    return (req: Req, res: Res, next) => {
        res.local = {
            buffer: null,
            dispatch: null,
            extract: null,
            store: null,
        };

        next();
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 04.03.2020
 * Time: 19:06
 */
export default factory;