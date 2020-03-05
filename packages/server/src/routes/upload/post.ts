import handlerFactory from '../../services/handler';
import {HTTP_STATUS} from "../../middlewares/dispatcher";
import Req from "../../types/Req";
import Res from "../../types/Res";

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.01.2020
 * Time: 19:25
 */
export default async (req: Req, res: Res) => {
    const {local: {buffer, store, extract, dispatch}} = res;

    if (!buffer) {
        return await dispatch(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

    const {exists, create} = await handlerFactory(buffer, store, extract);

    if (!exists()) {
        try {
            if (create()) {
                return await dispatch(HTTP_STATUS.CREATED);
            }
        } catch (e) {
            console.error(e);

            return await dispatch(HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }

        await dispatch(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    } else {
        await dispatch(HTTP_STATUS.CONFLICT)
    }
}