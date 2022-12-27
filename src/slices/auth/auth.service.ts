import { AxiosResponse } from "axios";
import API, { updateAPI} from "../../lib/API";
import store from "../../store";
import { setUser } from "./auth";

export const setUserAndAuth = (data: any) => {
    updateAPI(data.access.token);
  
    store.dispatch(setUser(data.data));
};

/**
 * Get the current logged in user
 * @returns {Promise<AxiosResponse>}
 */
export const getUser = async (): Promise<AxiosResponse> => (await API.get(`/users/me`)).data;
