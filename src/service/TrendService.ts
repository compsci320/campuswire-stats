import { post } from "./HttpService";
import mock_data from '../mock/mock.json';

export const getTrendsData = async () => await post('/get_data', mock_data);