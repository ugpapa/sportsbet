export interface IpMapping {
  id: string;
  publicIp: string;
  privateIps: string[];
  allowedTimes: {
    startTime: string;
    endTime: string;
    days: string[];
  };
  description: string;
  isActive: boolean;
}

export interface Settings {
  twoFactorAuth: boolean;
  ipMappings: IpMapping[];
  // 기타 설정들...
}

export interface AccessControlRule {
  id: string;
  adminId: string;
  publicIp: string;
  privateIps: string[];
  allowedTime: {
    start: string;
    end: string;
  };
  allowedDays: string[];
  createdAt: string;
  isActive: boolean;
}

export interface NotificationSettings {
  adminLogin: boolean;
  userRegistration: boolean;
  depositRequest: boolean;
  withdrawalRequest: boolean;
  suspiciousActivity: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  telegramNotifications: boolean;
  [key: string]: boolean; // Allow dynamic notification keys
} 