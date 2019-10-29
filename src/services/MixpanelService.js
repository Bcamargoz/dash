import Mixpanel from 'react-native-mixpanel';
import config from '../vars/config';

class MixpanelService {
    constructor() {
        this.mixpanel = callback => Mixpanel.sharedInstanceWithToken(config.MIXPANEL_TOKEN)
            .then(() => callback())
            .catch(error => console.log('Failed to initialize Mixpanel: ', error));
    }

    track = async (event) => {
        this.mixpanel(() => Mixpanel.track(event));
    };
}

export default new MixpanelService();