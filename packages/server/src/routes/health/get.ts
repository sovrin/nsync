import dispatcherFactory, {HTTP_STATUS} from '../../services/dispatcher';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 12.01.2020
 * Time: 19:47
 */
export default async (req, res) => {
    const {dispatch} = dispatcherFactory(req, res);

    await dispatch(HTTP_STATUS.OK, {ok: true});
}