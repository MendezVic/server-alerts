import axios from 'axios';
export default class AlertsService {
  static async getAlerts(searchTerm, page) {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/alerts', {
        params: { searchTerm, page },
      });
      return data;
    } catch (e) {
      throw e.response.data;
    }
  }
}
