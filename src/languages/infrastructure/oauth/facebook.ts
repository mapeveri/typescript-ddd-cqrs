import axios from 'axios';
import { SocialLogin } from '../../domain/user/auth';

export default class Facebook implements SocialLogin {
  async login(token: string): Promise<boolean> {
    let isValid;
    try {
      const response = await axios.get(`https://graph.facebook.com/v8.0/me?access_token=${token}`);

      const { data } = response;
      if (data.error) return false;

      isValid = true;
    } catch (e) {
      isValid = false;
    }

    return isValid;
  }
}
