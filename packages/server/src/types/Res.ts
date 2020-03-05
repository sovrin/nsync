import {ServerResponse} from "http";
import Local from "./Local";

interface Res extends ServerResponse {
    local: Local,
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.01.2020
 * Time: 20:23
 */
export default Res;