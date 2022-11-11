import { WebPartContext } from '@microsoft/sp-webpart-base';
import { spfi, SPFI, SPFx } from '@pnp/sp';
import { LogLevel, PnPLogging } from '@pnp/logging';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/batching';
import '@pnp/sp/fields';
import '@pnp/sp/files';
import '@pnp/sp/folders';
import '@pnp/sp/site-groups/web';
import '@pnp/sp/items/get-all';
import '@pnp/sp/site-users/web';

// eslint-disable-next-line no-var
var _sp: SPFI = null;

export const getSP = (context?: WebPartContext): SPFI => {
	if (context !== null && _sp === null) {
		_sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
	}
	return _sp;
};
