import {Readable} from "stream";
import {createGunzip} from "zlib";
import {extract} from 'tar-stream';
import {pipe} from "../utils";
import Req from "../types/Req";
import Res from "../types/Res";

/**
 *
 */
const factory = () => {

    /**
     *
     * @param buffer
     */
    const convert = (buffer: Buffer) => {
        const stream = new Readable();
        stream.push(buffer);
        stream.push(null);

        return stream;
    };

    /**
     *
     * @param stream
     * @param file
     */
    const pick = (stream, file): Promise<any> => (
        new Promise((resolve, reject) => {
            const data = [];

            stream
                .on('error', reject)
                .pipe(createGunzip())
                .pipe(extract())
                .on('entry', (entry, source, next) => {
                    if (entry.name !== file) {
                        return next()
                    }

                    source.on('data', (chunk) => {
                        data.push(chunk)
                    });

                    source.on('end', () => {
                        resolve(data.join(''))
                    });

                    source.on('error', reject);

                    next()
                })
            ;
        })
    );

    /**
     *
     * @param buffer
     * @param file
     */
    const process = async (buffer: Buffer, file: string) => {
        const picker = async (stream) => await pick(stream, file);

        return await pipe(
            buffer,
            convert,
            picker
        );
    };

    return async (req: Req, res: Res, next) => {
        res.local.extract = async (file) => {
            return await process(res.local.buffer, file)
        };

        next();
    }
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 05.03.2020
 * Time: 19:37
 */
export default factory;