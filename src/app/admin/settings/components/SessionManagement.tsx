import React from 'react';

interface SessionManagementSettings {
  sessionTimeout: number;
  maxConcurrentSessions: number;
  rememberMeDuration: number;
}

interface SessionManagementProps {
  settings: SessionManagementSettings;
  onSettingChange: (key: keyof SessionManagementSettings, value: number) => void;
}

export default function SessionManagement({ settings, onSettingChange }: SessionManagementProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">세션 관리 설정</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700">세션 타임아웃 (분)</label>
          <input
            id="sessionTimeout"
            type="number"
            value={settings.sessionTimeout}
            onChange={(e) => onSettingChange('sessionTimeout', parseInt(e.target.value))}
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            min="1"
          />
        </div>

        <div>
          <label htmlFor="maxConcurrentSessions" className="block text-sm font-medium text-gray-700">동시 접속 세션 수</label>
          <input
            id="maxConcurrentSessions"
            type="number"
            value={settings.maxConcurrentSessions}
            onChange={(e) => onSettingChange('maxConcurrentSessions', parseInt(e.target.value))}
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            min="1"
          />
        </div>

        <div>
          <label htmlFor="rememberMeDuration" className="block text-sm font-medium text-gray-700">자동 로그인 유지 기간 (일)</label>
          <input
            id="rememberMeDuration"
            type="number"
            value={settings.rememberMeDuration}
            onChange={(e) => onSettingChange('rememberMeDuration', parseInt(e.target.value))}
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            min="1"
          />
        </div>
      </div>
    </div>
  );
} 