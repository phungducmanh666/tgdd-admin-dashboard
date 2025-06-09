export default class ApiClient {
  static BaseURL = "http://localhost:8080";
  static GetUrl(url: string): string {
    return `${ApiClient.BaseURL}${url}`;
  }
}
