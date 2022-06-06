import store from "./client/redux/store";

export interface IQuery {
  query: string;
  values?: Array<string | number>;
}

export interface AppProps {}

export interface LoginPageProps {}

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

export interface NewChirpProps {}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
