import { post } from "./HttpService";
import mock_data from '../mock/mock.json';
// Get the Trend Data remotely from another directory
export const getTrendsData = async () => await post('/get_data', mock_data);