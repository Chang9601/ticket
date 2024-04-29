//import { get } from 'env-var';

export class ServerConfig {
  public static readonly NODE_ENV = 'development'; //get('NODE_ENV').required().asString();
  public static readonly HOST = 'localhost'; //get('HOST').required().asString();
  public static readonly PORT = 3002; //get('PORT').required().asPortNumber();
  public static readonly AUTH_HOST = 'localhost'; //get('AUTH_HOST').required().asString();
  public static readonly AUTH_PORT = 3001; //get('AUTH_PORT').required().asPortNumber();
  public static readonly FILE_HOST = 'localhost'; //get('FILE_HOST').required().asString();
  public static readonly FILE_PORT = 3003; //get('FILE_PORT').required().asPortNumber();

  public static readonly DB_TYPE = 'mysql';
  public static readonly DB_HOST = 'localhost'; //get('DB_HOST').required().asString();
  public static readonly DB_PORT = 3306; //get('DB_PORT').required().asPortNumber();
  public static readonly DB_DATABASE = 'ticketing'; //get('DB_NAME').required().asString();
  public static readonly DB_USERNAME = 'root'; //get('DB_USERNAME').required().asString();
  public static readonly DB_PASSWORD = 'root!@'; //get('DB_PASSWORD').required().asString();
  public static readonly DB_SYNCHRONIZE = true; //get('DB_SYNCHRONIZE')
  //.required()
  //.asBool();

  public static readonly ACCESS_TOKEN_SECRET = 'access_token_secret';
  //get('ACCESS_TOKEN_SECRET')
  //  .required()
  //  .asString();
  public static readonly ACCESS_TOKEN_EXPIRATION = 3600;
  // get(
  //   'ACCESS_TOKEN_EXPIRATION',
  // )
  //   .required()
  //   .asInt();
}
