
import { Google } from 'expo';

export default class SignInWithGL {



    static async Login() {
        try {
            const { type, accessToken, user } = await Google.logInAsync({
                androidClientId: '70101464505-t9nkejeghfo6a2q3ing56mcuv4ml0vf9.apps.googleusercontent.com',
                // iosClientId: YOUR_CLIENT_ID_HERE,
                scopes: ['profile', 'email'],
            });
            //console.log("type=", type)
            if (type === 'success') {
                return { type, accessToken, user }
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

}