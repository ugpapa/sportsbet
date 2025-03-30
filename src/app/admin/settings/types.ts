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