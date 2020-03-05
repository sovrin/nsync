interface Dispatcher {
    (status: number, payload?: any): Promise<void>
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.01.2020
 * Time: 20:25
 */
export default Dispatcher;