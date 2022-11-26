export interface GenericDataModel<T> {
    code?: String;
    message?: String;
    data?: T;
}

export interface Token {
    token: String;
    tokenType: String;
    expirationTime: number;
}
