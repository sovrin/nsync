import Link from "./Link";

interface Handler {
    exists(): boolean,
    create(): Link,
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.01.2020
 * Time: 20:14
 */
export default Handler;