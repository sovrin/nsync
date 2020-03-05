import Store from "./Store";
import Extractor from "./Extractor";
import Dispatcher from "./Dispatcher";

interface Local {
    buffer: Buffer,
    store: Store,
    extract: Extractor,
    dispatch: Dispatcher,
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 05.03.2020
 * Time: 19:28
 */
export default Local;