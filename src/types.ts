export interface IQuery {
  query: string;
  values?: Array<string | number>;
}

export interface AppProps {}

export interface IChirp {
  id: number;
  userid: number;
  content: string;
  location: string;
  _created: Date | string;
}

export interface INewChirpInfo {
  content: string;
  location: string;
}
