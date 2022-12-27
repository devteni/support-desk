import { AxiosResponse } from "axios";
import API, { updateAPI} from "../../lib/API";
import { setUser } from "./auth";


// initializes store at application setup to avoid circular deps
let store: any;
export const injectStore = (_store: any) => store = _store

export const setUserAndAuth = (data: any) => {
    updateAPI(data.tokens.access.token);
  
    store.dispatch(setUser(data.data));
};

/**
 * Get the current logged in user
 * @returns {Promise<AxiosResponse>}
 */
export const getUser = async (): Promise<AxiosResponse> => (await API.get(`/users/me`)).data;

const authService = {
    setUserAndAuth, 
    getUser,
};

export default authService;
