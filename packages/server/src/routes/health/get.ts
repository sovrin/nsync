import {HTTP_STATUS} from "../../middlewares/dispatcher";
import Res from "../../types/Res";
import Req from "../../types/Req";

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.01.2020
 * Time: 19:47
 */
export default async (req: Req, res: Res) => {
    const {local: {dispatch}} = res;

    await dispatch(HTTP_STATUS.OK, {ok: true});
}