import Req from "./Req";


interface Container {
    inject({id}: Req, fn): any,
    pipe({id}: Req, ...fns: Array<Function>): any,
    fetch({id}: Req, name: string): any,
    register({id}: Req, name: string, target: any): void,
    release({id}: Req),
    expose({id}: Req),
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.01.2020
 * Time: 20:16
 */
export default Container;