import {extname, basename} from 'path';
import Store from "../types/Store";
import Upload from "../types/Upload";
import Link from "../types/Link";
import Handler from "../types/Handler";

/**
 *
 * @param upload
 * @param store
 */
const factory = (upload: Upload, store: Store): Handler => {
    const {data, buffer} = upload;

    /**
     *
     * @param data
     */
    const process = (data: string) => {
        const [name, tail] = data.split('#');
        const extension = extname(tail);
        const version = basename(tail, extension);

        return {
            extension,
            version,
            name,
            date: new Date()
        }
    };

    const {name, version, date, extension} = process(data);

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

        try {
            entity = store.create(name, version);
            entity.write(buffer);
        } catch (e) {
            console.error(e);

            return null;
        }

        return entity;
    };

    return  {
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