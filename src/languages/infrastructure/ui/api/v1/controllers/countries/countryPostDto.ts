export default class CountryPostDto {
  id: string;
  name: string;
  iso: string;
  languages: Array<Record<string, any>>;
}
