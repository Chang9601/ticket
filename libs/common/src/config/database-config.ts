//import { get } from 'env-var';

export class DatabaseConfig {
  public static readonly DB_TYPE = 'mysql';
  public static readonly DB_HOST = 'localhost'; //get('DB_HOST').required().asString();
  public static readonly DB_PORT = 3306; //get('DB_PORT').required().asPortNumber();
  public static readonly DB_DATABASE = 'auth'; //get('DB_NAME').required().asString();
  public static readonly DB_USERNAME = 'root'; //get('DB_USERNAME').required().asString();
  public static readonly DB_PASSWORD = 'root!@'; //get('DB_PASSWORD').required().asString();
  public static readonly DB_SYNCHRONIZE = true;
}
