import { get } from "./HttpService";

export const getTrendsData = async () => await get('/data');