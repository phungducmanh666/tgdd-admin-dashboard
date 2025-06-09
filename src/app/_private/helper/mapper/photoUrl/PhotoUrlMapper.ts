export default class PhotoUrlMapper {
  static map(photoUrl: string): string {
    return `http://localhost:8080/Photos/${photoUrl}`;
  }
}
