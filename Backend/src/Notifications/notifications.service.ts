import { Injectable } from '@nestjs/common';
import * as notifier from 'node-notifier';
import * as path from 'path';  // Import path module to handle path resolution

@Injectable()
export class NotificationService {
  // General function to send notifications for any event
  sendNotification(title: string, message: string, sound: boolean = true): void {
    // Resolve the logo path relative to your application's root
    const logoPath = path.join('src/logo/OOS.ico'); // Assuming logo is in src/logo

    notifier.notify({
      title: title, // Title of the notification (e.g., "Payment Done")
      message: message, // Message to display (e.g., "Your payment is successfully completed.")
      sound: sound, // Optionally, add a sound to the notification
      wait: true, // Wait for user acknowledgment
      icon: logoPath, // Use custom logo
      appID: 'Office of Sports', // Set custom app name
    });
  }
}
