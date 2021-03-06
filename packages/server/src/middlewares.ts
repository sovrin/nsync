import {receiver, storer, initializer, extractor, dispatcher, logger} from './middlewares/index';
import config from "./config";

const storage = config('store.path');

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.01.2020
 * Time: 19:48
 */
export default [
    () => logger(),
    () => initializer(),
    () => dispatcher(),
    () => receiver(),
    () => extractor(),
    () => storer(storage),
];
