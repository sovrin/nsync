import {randomBytes} from "crypto";

import {
    createReadStream as read,
    unlinkSync as unlink,
    writeFileSync as write,
    statSync as stat,
    mkdirSync as mkdir,
    readdirSync as dir
} from 'fs';

/**
 *
 * @param args
 */
const pipe = (...args) => args.reduce((prev, curr) => curr(prev));

/**
 *
 * @param length
 * @param charset
 */
const eid = (length = 32, charset = 'ABCDEF012345679') => (
    [...randomBytes(length)]
        .map((n) => charset[n % charset.length])
        .join('')
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 10.01.2020
 * Time: 21:34
 */
export {
    read,
    unlink,
    write,
    stat,
    mkdir,
    dir,
    pipe,
    eid,
};
