import { SPFI } from "@pnp/sp";
import { getSP } from "../config/pnp-config";
import logger from "../utils/Logger";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export default class CommonService {
  private _sp: SPFI = null;

  constructor(context: WebPartContext) {
    this._sp = getSP(context);
  }

  public async getCandidates(): Promise<any> {
    try {
      return new Promise<any>(async (resolve, reject) => {
        let response = await this._sp.web.lists
          .getByTitle('Recruitment tracker')
          .items
          .select('Title,Position,Progress,InterviewDate,LinkedInProfile')
          .getAll();

        resolve(response);
      });
    } catch (err) {
      logger.writeError("Common Service", "getCandidates", err.stack);
      throw err;
    }
  }
}
