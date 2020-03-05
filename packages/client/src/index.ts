import {request} from 'http';
import {createReadStream} from 'fs';
import {parse} from 'url';

/**
 *
 * @param file
 */
const factory = (file) => {
    const {hostname, port} = parse(process.env.ENDPOINT);

    const options = {
        host: hostname,
        port,
        path: '/upload',
        method: 'POST',
    };

    /**
     *
     * @param stream
     * @param callback
     */
    const send = (stream, callback) => {
        const req = request(options, callback);

        stream.on('data', (data) => {
            req.write(data);
        });

        stream.on('end', () => {
            req.end();
        });
    };

    return new Promise(((resolve, reject) => {
        let stream;

        try {
            stream = createReadStream(file);
        } catch (e) {
            return reject({
                status: 500,
                message: e
            })
        }

        try {
            return send(stream, ({statusMessage, statusCode}) => {
                return resolve({
                    status: statusCode,
                    message: statusMessage
                })
            });
        } catch (e) {
            reject({
                status: 500,
                message: e
            })
        }
    }))
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 05.03.2020
 * Time: 20:39
 */
export default factory;