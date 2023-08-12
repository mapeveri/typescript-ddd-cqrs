export default class WordPostDto {
  id: string;
  language_id: string;
  country_id: string;
  user_id: string;
  terms: Array<Record<string, any>>;
}
