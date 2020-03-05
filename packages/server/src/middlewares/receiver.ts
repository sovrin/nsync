import {buffer} from "micro";
import Res from "../types/Res";
import Req from "../types/Req";

const METHODS = [
    'POST',
    'PUT'
];

/**
 *
 */
const factory = () => {
    const head = Buffer.from('\r\n\r\n');
    const tail = Buffer.from('\r\n');

    /**
     *
     * @param buffer
     */
    const isolate = (buffer) => {
        let offset = 0;

        for (let i = 0; i <= buffer.length; i++) {
            offset = i + head.length;

            const cursor = buffer.slice(i, offset);

            if (Buffer.compare(head, cursor) === 0) {
                buffer = buffer.slice(offset);

                break;
            }
        }

        for (let i = buffer.length - tail.length; i >= 0; i--) {
            offset = i - tail.length;

            const cursor = buffer.slice(offset, i);

            if (Buffer.compare(tail, cursor) === 0) {
                buffer = buffer.slice(0, -(buffer.length - offset));

                break;
            }
        }

        return buffer;
    };

    /**
     *
     */
    return async (req: Req, res: Res, next) => {
        const {method} = req;

        if (METHODS.includes(method)) {
            try {
                const upload = await buffer(req);

                res.local.buffer = isolate(upload);
            } catch (e) {
                console.error(e);
            }
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