import {Injectable} from "@angular/core";
import { environment} from '../environments/environment';

@Injectable()
export class AppConfig {

  static API_PATH = environment.apiPath;
  static RESPONCE_CODE = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    PAGE_NOT_FOUND: 404,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    UNPROCESSABLE: 422,
    SERVER_ERROR: 500,
    BAD_GATEWAY: 502
  };


}
