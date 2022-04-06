export interface IQuery {
  query: string;
  values?: Array<string | number>;
}

export interface AppProps {}

export interface LoginPageProps {
  username: string;
  password: string;
  loggedIn: boolean;
  handleUsernameChange: Function;
  handlePasswordChange: Function;
  handleloggedIn: Function;
}

export interface ChirpsProps {
  handleSetChirpArray?: Function;
  chirpArray?: IChirp[];
}

export interface InputsProps {
  handleSetChirpArray?: Function;
  chirpArray?: IChirp[];
}

export interface TimelineProps {
  chirpArray?: IChirp[];
  singleChirp?: IChirp;
}

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
