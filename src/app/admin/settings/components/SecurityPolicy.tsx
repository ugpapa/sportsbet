import React from 'react';

interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  expiryDays: number;
}

interface SecurityPolicyProps {
  passwordPolicy: PasswordPolicy;
  loginAttempts: number;
  lockoutDuration: number;
  onPasswordPolicyChange: (policy: PasswordPolicy) => void;
  onLoginAttemptsChange: (value: number) => void;
  onLockoutDurationChange: (value: number) => void;
}

export default function SecurityPolicy({
  passwordPolicy,
  loginAttempts,
  lockoutDuration,
  onPasswordPolicyChange,
  onLoginAttemptsChange,
  onLockoutDurationChange
}: SecurityPolicyProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">보안 정책 설정</h2>
      
      <div className="space-y-4">
        <div className="border rounded-md p-4">
          <h3 className="text-md font-medium text-gray-900 mb-4">비밀번호 정책</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="minLength" className="block text-sm font-medium text-gray-700">최소 길이</label>
              <input
                id="minLength"
                type="number"
                value={passwordPolicy.minLength}
                onChange={(e) => onPasswordPolicyChange({
                  ...passwordPolicy,
                  minLength: parseInt(e.target.value)
                })}
                className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                min="8"
              />
            </div>
            <div>
              <label htmlFor="expiryDays" className="block text-sm font-medium text-gray-700">만료 기간 (일)</label>
              <input
                id="expiryDays"
                type="number"
                value={passwordPolicy.expiryDays}
                onChange={(e) => onPasswordPolicyChange({
                  ...passwordPolicy,
                  expiryDays: parseInt(e.target.value)
                })}
                className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {Object.entries({
              requireUppercase: '대문자 포함',
              requireLowercase: '소문자 포함',
              requireNumbers: '숫자 포함',
              requireSpecialChars: '특수문자 포함'
            }).map(([key, label]) => (
              <div key={key} className="flex items-center">
                <input
                  id={key}
                  type="checkbox"
                  checked={passwordPolicy[key as keyof PasswordPolicy] as boolean}
                  onChange={(e) => onPasswordPolicyChange({
                    ...passwordPolicy,
                    [key]: e.target.checked
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={key} className="ml-2 block text-sm text-gray-700">
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="loginAttempts" className="block text-sm font-medium text-gray-700">로그인 시도 제한</label>
            <input
              id="loginAttempts"
              type="number"
              value={loginAttempts}
              onChange={(e) => onLoginAttemptsChange(parseInt(e.target.value))}
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              min="1"
            />
          </div>
          <div>
            <label htmlFor="lockoutDuration" className="block text-sm font-medium text-gray-700">잠금 시간 (분)</label>
            <input
              id="lockoutDuration"
              type="number"
              value={lockoutDuration}
              onChange={(e) => onLockoutDurationChange(parseInt(e.target.value))}
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              min="1"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 