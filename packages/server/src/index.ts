import micro from 'micro';
import routerFactory from './router';
import config from './config';

const port = config('server.port');
const {version} = require('../package.json');

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.01.2020
 * Time: 16:48
 */
(async () => {
    const router = await routerFactory();
    const server = micro(router);

    server.listen(port, () => {
        console.info(`> nsync-server:${version} listening on port ${port}`);
    });
})();

