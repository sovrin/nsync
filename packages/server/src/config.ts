const config = {
    env: process.env.NODE_ENV || 'development',
    server: {
        port: process.env.PORT || 3000,
    },
    store: {
        path: process.env.STORE || __dirname + '/../store'
    },
    receiver: {
        limit: 64 * 1024 * 1024,
    },
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.01.2020
 * Time: 17:08
 */
export default (path: string): string | number => {
    const parts = path.split('.');

    const value = parts.reduce((acc, part) => {
        if (acc[part] !== null) {
            acc = acc[part];
        }

        return acc;
    }, config);

    if (!value) {
        throw new Error(`No config value for ${path} available`);
    }

    if (typeof value === "object") {
        throw new Error("Only final values are allowed");
    }

    return value;
};

