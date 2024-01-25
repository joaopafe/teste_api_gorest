export interface IListUsers {
  limit?: number | any;
}

export interface ICreateUser {
  email?: string | any;
  name?: string | any;
  password?: string | any;
  role?: string | any;
  avatar?: string | any;
}

export interface IDeleteUser {
  id?: number | any;
}

export interface IListUserById {
  id?: number | any;
}

export interface IUpdateUser {
  id?: number | any;
  email?: string | any;
  name?: string | any;
  password?: string | any;
  role?: string | any;
  avatar?: string | any;
}
