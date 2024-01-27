export interface IListCategories {
  limit?: number | any;
}

export interface ICreateCategorie {
  name?: string | any;
  image?: string | any;
}

export interface IListCategorieById {
  id?: number | any;
}

export interface IUpdateCategorie {
  id?: number | any;
  name?: string | any;
  image?: string | any;
}
