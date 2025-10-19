import axios from "axios";
import { auth } from "../firebase";
import { StringObject } from "../types";
import { isLocal } from "./utils";

export const serverUrl = isLocal ? "http://localhost:9000" : "https://keepqueue-server-latest.onrender.com";

type Method = "GET" | "POST" | "PUT" | "DELETE";

type MainEndpoints = "data" | "actions";

export const apiCall = async <T = any>(
    method: Method,
    endpoint: MainEndpoints,
    url: string,
    data?: StringObject,
    config?: { signal?: AbortSignal }
): Promise<T | null> => {
    try {
        const token = await auth.currentUser?.getIdToken();
        const headers = {
            authorization: token ? "bearer " + token : undefined,
        };
        const response = await axios({
            headers,
            method,
            url: `${serverUrl}/${endpoint}/${url}`,
            data,
            signal: config?.signal,
        });
        return response.data.data as T;
    } catch (error) {
        console.error(`Error calling API: ${JSON.stringify({ method, url })} `, error);
        return null;
    }
};
