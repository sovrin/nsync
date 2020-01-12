import router from 'micro-r';
import middlewares from "./middlewares";

/**
 *
 */
const factory = async () => {
    const {register, route, use, configure} = router((req, res) => {
        // console.info(req);
    });

    configure({
        ext: '.ts',
    });

    for (const middleware of middlewares) {
        use(middleware());
    }

    await register('./src/routes');

    return route;
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.01.2020
 * Time: 19:48
 */
export default factory;