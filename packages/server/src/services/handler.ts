import Store from "../types/Store";
import Link from "../types/Link";
import Handler from "../types/Handler";
import Extractor from "../types/Extractor";

/**
 *
 * @param buffer
 * @param store
 * @param extract
 */
const factory = async (buffer: Buffer, store: Store, extract: Extractor): Promise<Handler> => {
    const {name, version} = await (extract('package/package.json')
        .then(JSON.parse))
    ;

    /**
     *
     */
    const exists = (): boolean => (
        store.exists(name, version)
    );

    /**
     *
     */
    const create = (): Link => {
        let entity;

        entity = store.create(name, version);
        entity.write(buffer);

        return entity;
    };

    return {
        exists,
        create,
    }
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 10.01.2020
 * Time: 21:58
 */
export default factory;