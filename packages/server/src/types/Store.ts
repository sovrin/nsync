import Link from "./Link";

interface Store {
    get(name: string, version: string): Link,
    exists(name: string, version: string): boolean,
    create(name: string, version: string): Link,
    remove(name: string, version: string): boolean,
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.01.2020
 * Time: 18:33
 */
export default Store;