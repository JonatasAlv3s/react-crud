import axios from "axios";

import { Environment } from "../../../environments";
import { errorinterceptor, responseinterceptor } from "./interceptors";

const Api = axios.create({
    baseURL: Environment.URL_BASE,
});

Api.interceptors.response.use(
    (response) => responseinterceptor(response),
    (error) => errorinterceptor(error),
);

export { Api };