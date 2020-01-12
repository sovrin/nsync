import {ReadStream} from "fs";
import * as utils from '../utils';
import Link from "../types/Link";

/**
 *
 */
const factory = (cursor): Link => {

    /**
     *
     */
    const unlink = (): boolean => {
        try {
            utils.unlink(cursor)
        } catch (e) {
            return false;
        }

        return true;
    };

    /**
     *
     * @return {*}
     */
    const read = (): ReadStream => (
        utils.read(cursor)
    );

    /**
     *
     * @param buffer
     * @return {boolean}
     */
    const write = (buffer: string | Buffer): boolean => {
        try {
            utils.write(cursor, buffer);
        } catch (e) {
            return false;
        }

        return true;
    };

    return {
        unlink,
        read,
        write,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 10.01.2020
 * Time: 21:24
 */
export default factory;