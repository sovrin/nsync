import Container from "../types/Container";

/**
 *
 */
const factory = (): Container => {
    const container = {};

    /**
     *
     * @param id
     * @param fn
     * @returns {*}
     */
    const inject = async ({id}, fn) => {
        const matches = extract(fn);
        const [raw, match] = matches;

        if (match === '') {
            return await fn.apply(null);
        }

        const entries = match
            .split(',')
            .map(name => name.trim())
            .map(name => fetch(id, name))
            .filter(Boolean)
        ;

        if (entries.length === 0) {
            throw new Error('unknown dependency');
        }

        return await fn.apply(null, entries);
    };

    /**
     *
     * @param id
     * @param fns
     */
    const pipe = async ({id}, ...fns: Array<Function>) => {
        let context = undefined;

        for (let fn of fns) {
            if (context !== undefined) {
                fn = await inject(id, fn);

                if (typeof fn === 'function') {
                    context = await fn(context);
                }

            } else {
                context = await inject(id, fn);
            }
        }

        return context;
    };

    /**
     *
     * @param req
     * @param name
     * @returns {*}
     */
    const fetch = ({id}, name) => (
        container[id][name]
    );

    /**
     *
     * @param fn
     * @returns {string}
     */
    const stringify = (fn) => (
        Function.prototype.toString.call(fn)
    );

    /**
     *
     * @param req
     * @param name
     * @param target
     */
    const register = ({id}, name, target): void => {
        if (!container[id]) {
            container[id] = {};
        }

        container[id][name] = target;
    };

    /**
     *
     * @param fn
     */
    const extract = (fn): RegExpMatchArray => {
        const string = stringify(fn);

        return (string.match(/\((.*?)\)/) || string.match(/(\w+)/));
    };

    /**
     *
     */
    const release = ({id}): void => {
        delete container[id];
    };

    /**
     *
     * @param req
     */
    const expose = ({id}): any => {
        return container[id];
    };

    return {
        inject,
        pipe,
        fetch,
        register,
        release,
        expose,
    }
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.01.2020
 * Time: 19:48
 */
export default factory;