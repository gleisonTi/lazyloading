export class User {
  id: number | string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;

  static fromJson(jsonData: any): User {
    return Object.assign(new User(), jsonData);
  }
}

export class AcessToken {
  access_token: string;
  refresh_token: string;
  scope: string;
  user_guid: string;

  static fromJson(jsonData: any): AcessToken {
    return Object.assign(new AcessToken(), jsonData);
  }

  static getData(): AcessToken {
    return  AcessToken.fromJson(localStorage.getItem("currentUser"))
  }

}
