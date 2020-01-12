import {expose} from "../../container";
import handlerFactory from '../../services/handler';
import dispatcherFactory, {HTTP_STATUS} from '../../services/dispatcher';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.01.2020
 * Time: 20:05
 */
export default async (req, res) => {
    const {upload, store} = expose(req);
    const {dispatch} = dispatcherFactory(req, res);

    if (!upload) {
        return await dispatch(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

    const {exists, create} = handlerFactory(upload, store);

    if (exists()) {
        try {
            if (create()) {
                return await dispatch(HTTP_STATUS.OK);
            }
        } catch (e) {
            return await dispatch(HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }

        await dispatch(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    } else {
        await dispatch(HTTP_STATUS.NOT_FOUND)
    }
}