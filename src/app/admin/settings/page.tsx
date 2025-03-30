"use client";
import React, { useState, useEffect } from 'react';
import {
  Users,
  Shield,
  Bell,
  Save,
  Lock,
  Key,
  History,
  UserPlus,
  LogOut
} from 'lucide-react';
import AccessControl from './components/AccessControl';
import { AccessControlRule, NotificationSettings } from './types';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import AddAdminModal from './components/AddAdminModal';


interface Settings {
  adminAccounts: {
    accounts: Array<{
      id: number;
      username: string;
      nickname: string;
      role: string;
      email: string;
      lastLogin: string;
      status: string;
      ipAddresses: string[];
    }>;
  };
  accessControl: {
    ipWhitelist: string[];
    allowedTimeRanges: string[];
    twoFactorAuth: boolean;
    rules: AccessControlRule[];
  };
  permissions: {
    roles: Array<{
      name: string;
      permissions: string[];
    }>;
  };
  securityPolicy: {
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireLowercase: boolean;
      requireNumbers: boolean;
      requireSpecialChars: boolean;
      expiryDays: number;
    };
    loginAttempts: number;
    lockoutDuration: number;
  };
  notifications: NotificationSettings;
  auditLog: {
    retentionDays: number;
    logLevel: string;
    logActions: string[];
  };
  sessionManagement: {
    sessionTimeout: number;
    maxConcurrentSessions: number;
    rememberMeDuration: number;
  };
  ipMappings: AccessControlRule[];
}

const initialSettings: Settings = {
  adminAccounts: {
    accounts: [
      {
        id: 1,
        username: 'admin',
        nickname: '관리자',
        role: 'superadmin',
        email: 'admin@example.com',
        lastLogin: '2024-03-20 14:30:00',
        status: 'active',
        ipAddresses: ['192.168.1.100', '192.168.1.101']
      }
    ]
  },
  accessControl: {
    ipWhitelist: ['127.0.0.1'],
    allowedTimeRanges: ['09:00-18:00'],
    twoFactorAuth: true,
    rules: []
  },
  permissions: {
    roles: [
      {
        name: 'superadmin',
        permissions: ['all']
      },
      {
        name: 'admin',
        permissions: ['read', 'write', 'delete']
      },
      {
        name: 'operator',
        permissions: ['read', 'write']
      }
    ]
  },
  securityPolicy: {
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      expiryDays: 90
    },
    loginAttempts: 5,
    lockoutDuration: 30
  },
  notifications: {
    adminLogin: true,
    userRegistration: true,
    depositRequest: true,
    withdrawalRequest: true,
    suspiciousActivity: true,
    emailNotifications: true,
    smsNotifications: false,
    telegramNotifications: false
  },
  auditLog: {
    retentionDays: 90,
    logLevel: 'info',
    logActions: ['login', 'logout', 'create', 'update', 'delete']
  },
  sessionManagement: {
    sessionTimeout: 30,
    maxConcurrentSessions: 1,
    rememberMeDuration: 7
  },
  ipMappings: []
};

// Notification labels for the notifications section
const notificationLabels: Record<string, string> = {
  adminLogin: '관리자 로그인',
  userRegistration: '회원가입',
  depositRequest: '입금 요청',
  withdrawalRequest: '출금 요청',
  suspiciousActivity: '의심스러운 활동'
};

// 공통 스타일 클래스를 변수로 정의
const tableCellClass = "px-4 py-2 whitespace-nowrap text-sm text-gray-900";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [activeTab, setActiveTab] = useState('adminAccounts');
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      // TODO: API 연동
      // const response = await fetch('/api/settings');
      // const data = await response.json();
      
      // 임시 데이터
      const data = {
        ...initialSettings,
        security: {
          twoFactorAuth: true,
          ipMappings: [
            {
              id: '1',
              adminId: 'admin1',
              publicIp: '123.123.123.123',
              privateIps: ['192.168.1.100', '192.168.1.101'],
              allowedTime: { start: '09:00', end: '18:00' },
              allowedDays: ['월', '화', '수', '목', '금'],
              createdAt: new Date().toISOString(),
              isActive: true,
            },
          ],
        },
      };
      
      setSettings(data);
    } catch (error) {
      console.error('설정을 불러오는데 실패했습니다:', error);
      toast.error('설정을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setIsSaving(true);
      // TODO: API 연동
      // await fetch('/api/settings', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(settings),
      // });
      
      toast.success('설정이 저장되었습니다.');
    } catch (error) {
      console.error('설정 저장에 실패했습니다:', error);
      toast.error('설정 저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSettingChange = (
    category: keyof Settings,
    field: string,
    value: string | number | boolean | object | string[]
  ) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const handleAddAccessControlRule = (rule: Omit<AccessControlRule, 'id' | 'createdAt'>) => {
    const newRule: AccessControlRule = {
      ...rule,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    setSettings(prev => ({
      ...prev,
      accessControl: {
        ...prev.accessControl,
        rules: [...prev.accessControl.rules, newRule]
      }
    }));
  };

  const handleDeleteAccessControlRule = (id: string) => {
    setSettings(prev => ({
      ...prev,
      accessControl: {
        ...prev.accessControl,
        rules: prev.accessControl.rules.filter(rule => rule.id !== id)
      }
    }));
  };

  const handleUpdateAccessControlRule = (id: string, updates: Partial<AccessControlRule>) => {
    setSettings(prev => ({
      ...prev,
      accessControl: {
        ...prev.accessControl,
        rules: prev.accessControl.rules.map(rule => rule.id === id ? { ...rule, ...updates } : rule)
      }
    }));
  };

  const handleAddAdmin = (adminData: {
    username: string;
    nickname: string;
    role: string;
    email: string;
    password: string;
    ipAddresses: string[];
  }) => {
    const newAdmin = {
      id: settings.adminAccounts.accounts.length + 1,
      username: adminData.username,
      nickname: adminData.nickname,
      role: adminData.role,
      email: adminData.email,
      lastLogin: new Date().toISOString(),
      status: 'active',
      ipAddresses: adminData.ipAddresses
    };

    setSettings(prev => ({
      ...prev,
      adminAccounts: {
        ...prev.adminAccounts,
        accounts: [...prev.adminAccounts.accounts, newAdmin]
      }
    }));

    setShowAddAdminModal(false);
    toast.success('관리자가 추가되었습니다.');
  };

  // 관리자 계정 관리
  const renderAdminAccounts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">관리자 계정 관리</h2>
        <button
          onClick={() => setShowAddAdminModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          관리자 추가
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">아이디</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">닉네임</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">역할</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이메일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP 주소</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">마지막 로그인</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {settings.adminAccounts.accounts.map((account) => (
              <tr key={account.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.nickname}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.email}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="flex flex-wrap gap-1">
                    {account.ipAddresses.map((ip, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                        {ip}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.lastLogin}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    account.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {account.status === 'active' ? '활성' : '비활성'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">수정</button>
                  <button className="text-red-600 hover:text-red-900">삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddAdminModal
        isOpen={showAddAdminModal}
        onClose={() => setShowAddAdminModal(false)}
        onAdd={handleAddAdmin}
      />
    </div>
  );

  // 접근 제어 설정
  const renderAccessControl = () => (
    <AccessControl
      rules={settings.accessControl.rules}
      onAdd={handleAddAccessControlRule}
      onDelete={handleDeleteAccessControlRule}
      onUpdate={handleUpdateAccessControlRule}
    />
  );

  // 권한 설정
  const renderPermissions = () => (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">권한 설정</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">역할</th>
              <th className="text-left py-2">읽기</th>
              <th className="text-left py-2">쓰기</th>
              <th className="text-left py-2">삭제</th>
              <th className="text-left py-2">모든 권한</th>
            </tr>
          </thead>
          <tbody>
            {settings.permissions.roles.map((role, index) => (
              <tr key={index} className="border-b">
                <td className={tableCellClass}>{role.name}</td>
                <td className={tableCellClass}>
                  <input
                    type="checkbox"
                    checked={role.permissions.includes('read')}
                    onChange={() => handleSettingChange('permissions', 'roles', settings.permissions.roles.map((r, i) => i === index ? { ...r, permissions: [...r.permissions, 'read'] } : r))}
                    aria-label={`${role.name} 읽기 권한`}
                  />
                </td>
                <td className={tableCellClass}>
                  <input
                    type="checkbox"
                    checked={role.permissions.includes('write')}
                    onChange={() => handleSettingChange('permissions', 'roles', settings.permissions.roles.map((r, i) => i === index ? { ...r, permissions: [...r.permissions, 'write'] } : r))}
                    aria-label={`${role.name} 쓰기 권한`}
                  />
                </td>
                <td className={tableCellClass}>
                  <input
                    type="checkbox"
                    checked={role.permissions.includes('delete')}
                    onChange={() => handleSettingChange('permissions', 'roles', settings.permissions.roles.map((r, i) => i === index ? { ...r, permissions: r.permissions.filter(p => p !== 'delete') } : r))}
                    aria-label={`${role.name} 삭제 권한`}
                  />
                </td>
                <td className={tableCellClass}>
                  <input
                    type="checkbox"
                    checked={role.permissions.includes('all')}
                    onChange={() => handleSettingChange('permissions', 'roles', settings.permissions.roles.map((r, i) => i === index ? { ...r, permissions: ['all'] } : r))}
                    aria-label={`${role.name} 모든 권한`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // 보안 정책 설정
  const renderSecurityPolicy = () => (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">보안 정책</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">설정 항목</th>
              <th className="text-left py-2">값</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className={tableCellClass}>최소 비밀번호 길이</td>
              <td className={tableCellClass}>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={settings.securityPolicy.passwordPolicy.minLength}
                    onChange={(e) => handleSettingChange('securityPolicy', 'passwordPolicy', {
                      ...settings.securityPolicy.passwordPolicy,
                      minLength: parseInt(e.target.value)
                    })}
                    aria-label="최소 비밀번호 길이"
                    min="8"
                    max="32"
                  />
                  <span className="ml-2">자</span>
                </div>
              </td>
            </tr>
            <tr className="border-b">
              <td className={tableCellClass}>비밀번호 만료일</td>
              <td className={tableCellClass}>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={settings.securityPolicy.passwordPolicy.expiryDays}
                    onChange={(e) => handleSettingChange('securityPolicy', 'passwordPolicy', {
                      ...settings.securityPolicy.passwordPolicy,
                      expiryDays: parseInt(e.target.value)
                    })}
                    aria-label="비밀번호 만료일"
                    min="0"
                    max="365"
                  />
                  <span className="ml-2">일</span>
                </div>
              </td>
            </tr>
            <tr className="border-b">
              <td className={tableCellClass}>로그인 시도 제한</td>
              <td className={tableCellClass}>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={settings.securityPolicy.loginAttempts}
                    onChange={(e) => handleSettingChange('securityPolicy', 'loginAttempts', parseInt(e.target.value))}
                    aria-label="로그인 시도 제한"
                    min="1"
                    max="10"
                  />
                  <span className="ml-2">회</span>
                </div>
              </td>
            </tr>
            <tr className="border-b">
              <td className={tableCellClass}>계정 잠금 시간</td>
              <td className={tableCellClass}>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={settings.securityPolicy.lockoutDuration}
                    onChange={(e) => handleSettingChange('securityPolicy', 'lockoutDuration', parseInt(e.target.value))}
                    aria-label="계정 잠금 시간"
                    min="1"
                    max="1440"
                  />
                  <span className="ml-2">분</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  // 알림 설정
  const renderNotifications = () => (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">알림 설정</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">알림 항목</th>
              <th className="text-left py-2">이메일</th>
              <th className="text-left py-2">SMS</th>
              <th className="text-left py-2">텔레그램</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(notificationLabels).map(([key, label]) => (
              <tr key={key} className="border-b">
                <td className={tableCellClass}>{label}</td>
                <td className={tableCellClass}>
                  <input
                    type="checkbox"
                    checked={settings.notifications[`${key}_email`] || false}
                    onChange={(e) => handleSettingChange('notifications', `${key}_email`, e.target.checked)}
                    aria-label={`${label} 이메일 알림`}
                  />
                </td>
                <td className={tableCellClass}>
                  <input
                    type="checkbox"
                    checked={settings.notifications[`${key}_sms`] || false}
                    onChange={(e) => handleSettingChange('notifications', `${key}_sms`, e.target.checked)}
                    aria-label={`${label} SMS 알림`}
                  />
                </td>
                <td className={tableCellClass}>
                  <input
                    type="checkbox"
                    checked={settings.notifications[`${key}_telegram`] || false}
                    onChange={(e) => handleSettingChange('notifications', `${key}_telegram`, e.target.checked)}
                    aria-label={`${label} 텔레그램 알림`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // 감사 로그 설정
  const renderAuditLog = () => (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">감사 로그 설정</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">설정 항목</th>
              <th className="text-left py-2">값</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className={tableCellClass}>로그 보관 기간</td>
              <td className={tableCellClass}>
                <input
                  type="number"
                  value={settings.auditLog.retentionDays}
                  onChange={(e) => handleSettingChange('auditLog', 'retentionDays', parseInt(e.target.value))}
                  aria-label="로그 보관 기간"
                  min="1"
                  max="365"
                />
                <span className="ml-2">일</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  // 세션 관리 설정
  const renderSessionManagement = () => (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">세션 관리</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">설정 항목</th>
              <th className="text-left py-2">값</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className={tableCellClass}>세션 타임아웃</td>
              <td className={tableCellClass}>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={settings.sessionManagement.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionManagement', 'sessionTimeout', parseInt(e.target.value))}
                    aria-label="세션 타임아웃"
                    min="1"
                    max="1440"
                  />
                  <span className="ml-2">분</span>
                </div>
              </td>
            </tr>
            <tr className="border-b">
              <td className={tableCellClass}>최대 동시 세션</td>
              <td className={tableCellClass}>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={settings.sessionManagement.maxConcurrentSessions}
                    onChange={(e) => handleSettingChange('sessionManagement', 'maxConcurrentSessions', parseInt(e.target.value))}
                    aria-label="최대 동시 세션"
                    min="1"
                    max="10"
                  />
                  <span className="ml-2">개</span>
                </div>
              </td>
            </tr>
            <tr className="border-b">
              <td className={tableCellClass}>자동 로그인 유지 기간</td>
              <td className={tableCellClass}>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={settings.sessionManagement.rememberMeDuration}
                    onChange={(e) => handleSettingChange('sessionManagement', 'rememberMeDuration', parseInt(e.target.value))}
                    aria-label="자동 로그인 유지 기간"
                    min="1"
                    max="30"
                  />
                  <span className="ml-2">일</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">시스템 설정</h1>
        <Button 
          onClick={saveSettings} 
          disabled={isSaving}
          className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              저장 중...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              설정 저장
            </>
          )}
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'adminAccounts', label: '계정 관리', icon: Users },
              { id: 'accessControl', label: '접근 제어', icon: Shield },
              { id: 'permissions', label: '권한 설정', icon: Lock },
              { id: 'securityPolicy', label: '보안 정책', icon: Key },
              { id: 'notifications', label: '알림 설정', icon: Bell },
              { id: 'auditLog', label: '감사 로그', icon: History },
              { id: 'sessionManagement', label: '세션 관리', icon: LogOut },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'adminAccounts' && renderAdminAccounts()}
          {activeTab === 'accessControl' && renderAccessControl()}
          {activeTab === 'permissions' && renderPermissions()}
          {activeTab === 'securityPolicy' && renderSecurityPolicy()}
          {activeTab === 'notifications' && renderNotifications()}
          {activeTab === 'auditLog' && renderAuditLog()}
          {activeTab === 'sessionManagement' && renderSessionManagement()}
        </div>
      </div>
    </div>
  );
} 