import {IncomingMessage} from "http";

interface Req extends IncomingMessage {
    id: string;
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.01.2020
 * Time: 20:22
 */
export default Req;