import {resolve} from "path";
import {stat, dir, mkdir} from "../utils";
import link from './link';
import Link from "../types/Link";
import Store from "../types/Store";

/**
 *
 * @param path
 */
const factory = (path: string): Store => {
    const store = {};

    /**
     *
     * @param name
     * @param version
     */
    const tokenize = (name: string, version: string): string => (
        `${name}:${version}`
    );

    /**
     *
     * @param name
     */
    const map = (name: string): void => {
        const cursor = resolve(path, name);
        const stats = stat(cursor);

        if (stats.isDirectory()) {
            dir(cursor).map((version) => add(name, version));
        }
    };

    /**
     *
     * @param name
     * @param version
     */
    const get = (name: string, version: string) => {
        const key = tokenize(name, version);

        return store[key];
    };

    /**
     *
     * @param name
     * @param version
     */
    const add = (name: string, version: string): Link => {
        const key = tokenize(name, version);
        const cursor = resolve(path, name, version);
        const entity = link(cursor);

        store[key] = entity;

        return entity;
    };

    /**
     *
     * @param name
     * @param version
     */
    const exists = (name: string, version: string): boolean => {
        const key = tokenize(name, version);

        return !!store[key];
    };

    /**
     *
     * @param name
     * @param version
     */
    const create = (name: string, version: string): Link => {
        const cursor = resolve(path, name);

        try {
            stat(cursor);
        } catch (e) {
            mkdir(cursor);
        }

        return add(name, version);
    };

    /**
     *
     */
    const remove = (name: string, version: string): boolean => {
        const key = tokenize(name, version);
        const entity = get(name, version);

        if (!entity) {
            return false;
        }

        if (entity.unlink()) {
            delete store[key];

            return true;
        }

        return false;
    };

    dir(path).map(map);

    return {
        create,
        exists,
        remove,
        get,
    }
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 10.01.2020
 * Time: 21:27
 */
export default factory;