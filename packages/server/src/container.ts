import containerFactory from './services/container';

const {
    release,
    register,
    inject,
    pipe,
    fetch,
    expose
} = containerFactory();

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.01.2020
 * Time: 19:48
 */
export {
    release,
    register,
    inject,
    pipe,
    fetch,
    expose,
};
