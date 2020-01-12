import {buffer, text} from "micro";
import {parse} from 'querystring';
import {pipe} from "../utils";
import config from "../config";
import Upload from "../types/Upload";

const limit = config('receiver.limit');

/**
 *
 */
const factory = async (req): Promise<Upload> => {

    /**
     *
     * @param search
     * @param replace
     */
    const replace = (search: any, replace: string) => (string): string => string.replace(search, replace);

    /**
     *
     * @param raw
     */
    const extract = async (raw: string): Promise<any> => {
        const parts = raw.split('\r\n');

        for (let part of parts) {
            if (!part.toLowerCase().includes('content-disposition')) {
                continue;
            }

            const {filename} = pipe(
                part,
                replace(/; /g, '&'),
                replace(/: /g, '='),
                replace(/"/g, ''),
                parse
            );

            return filename;
        }
    };

    /**
     *
     * @param req
     */
    const process = async (req): Promise<string> => {
        const raw = await text(req);
        const filename = await extract(raw);

        if (!filename) {
            throw new Error('no filename! how did this happen?')
        }

        return filename;
    };

    return {
        buffer: await buffer(req, {
            limit
        }),
        data: await process(req)
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 10.01.2020
 * Time: 19:23
 */
export default factory;