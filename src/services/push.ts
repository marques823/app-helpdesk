import { PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { api } from './api';

export class PushService {
  private static instance: PushService;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): PushService {
    if (!PushService.instance) {
      PushService.instance = new PushService();
    }
    return PushService.instance;
  }

  public async init() {
    if (this.isInitialized || !Capacitor.isNativePlatform()) {
      console.log('[Push] Initialization skipped: isNative=' + Capacitor.isNativePlatform());
      return;
    }

    try {
      console.log('[Push] Initializing...');
      // Request permissions
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        console.warn('[Push] Permission not granted:', permStatus.receive);
        return;
      }

      // Add listeners before registration
      await this.addListeners();

      console.log('[Push] Registering with FCM...');
      // Register with Apple / Google
      // Note: On Android, this requires google-services.json to be present in android/app/
      try {
        await PushNotifications.register();
        this.isInitialized = true;
        console.log('[Push] Registered with platform');
      } catch (regError) {
        console.error('[Push] Registration failed (probably missing google-services.json):', regError);
        // Do not set isInitialized to true, so it can retry later if needed
      }
    } catch (e) {
      console.error('[Push] Initialization error:', e);
    }
  }

  private async addListeners() {
    // On registration success, we get the token
    await PushNotifications.addListener('registration', async (token: Token) => {
      console.log('Push registration success, token: ' + token.value);
      try {
        await api.savePushToken(token.value);
      } catch (e) {
        console.error('Failed to save push token to backend', e);
      }
    });

    // On registration error
    await PushNotifications.addListener('registrationError', (error: any) => {
       console.error('Push registration error: ', JSON.stringify(error));
    });

    // On notification received (in foreground)
    await PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Push notification received: ', JSON.stringify(notification));
      // You could show an in-app toast or update the UI here
    });

    // On notification action performed
    await PushNotifications.addListener('pushNotificationActionPerformed', (action: ActionPerformed) => {
      console.log('Push notification action performed: ', JSON.stringify(action));
      const data = action.notification.data;
      if (data && data.ticketId) {
        // Navigate to the ticket details if ticketId is provided
        window.location.href = `/tickets/${data.ticketId}`;
      }
    });
  }
}

export const pushService = PushService.getInstance();
