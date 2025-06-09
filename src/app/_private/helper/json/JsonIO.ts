import * as fs from "fs";

export default class JsonIO {
  static ReadJson<T>(filePath: string): T | null {
    try {
      const fileContent = fs.readFileSync(filePath, "utf8");
      return JSON.parse(fileContent) as T;
    } catch (error) {
      console.error(`Lỗi khi đọc file JSON tại ${filePath}:`, error);
      return null;
    }
  }

  static WriteJson<T>(filePath: string, data: T): void {
    try {
      const jsonString = JSON.stringify(data, null, 2); // null, 2 để format JSON dễ đọc
      fs.writeFileSync(filePath, jsonString, "utf8");
      console.log(`Ghi file JSON thành công vào ${filePath}`);
    } catch (error) {
      console.error(`Lỗi khi ghi file JSON tại ${filePath}:`, error);
    }
  }
}
