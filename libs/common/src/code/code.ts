export type CodeAttr = {
  code: number;
  message: string;
};

export type CodeToMessage = Record<number, string>;
export type MessageToCode = Record<string, number>;

export class Code {
  public static readonly OK: CodeAttr = {
    code: 200,
    message: '성공했습니다',
  };

  public static readonly CREATED: CodeAttr = {
    code: 201,
    message: '생성되었습니다',
  };

  public static readonly BAD_REQUEST: CodeAttr = {
    code: 400,
    message: '잘못된 요청입니다',
  };

  public static readonly UNAUTHORIZED: CodeAttr = {
    code: 401,
    message: '권한이 없습니다',
  };

  public static readonly FORBIDDEN: CodeAttr = {
    code: 403,
    message: '금지되어 있습니다',
  };

  public static readonly NOT_FOUND: CodeAttr = {
    code: 404,
    message: '찾을 수 없습니다',
  };

  public static readonly CONFLICT: CodeAttr = {
    code: 409,
    message: '충돌이 발생했습니다',
  };

  public static readonly INTERNAL_SERVER_ERROR: CodeAttr = {
    code: 500,
    message: '서버 오류가 발생했습니다',
  };

  public static toMessage: CodeToMessage = {
    [Code.BAD_REQUEST.code]: Code.BAD_REQUEST.message,
    [Code.UNAUTHORIZED.code]: Code.UNAUTHORIZED.message,
    [Code.FORBIDDEN.code]: Code.FORBIDDEN.message,
  };

  public static toCode: MessageToCode = {};
}
