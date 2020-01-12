import {ReadStream} from "fs";

interface Link {
    unlink(): boolean,
    read(): ReadStream,
    write(buffer: string | Buffer): boolean
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.01.2020
 * Time: 18:35
 */
export default Link;