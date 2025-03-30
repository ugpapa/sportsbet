"use client";
import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, AlertCircle } from 'lucide-react';

// 샘플 데이터
const notificationSettings = [
  {
    id: 1,
    title: '입금 알림',
    description: '새로운 입금 요청이 들어왔을 때 알림을 받습니다.',
    channels: {
      email: true,
      push: true,
      sms: false
    }
  },
  {
    id: 2,
    title: '출금 알림',
    description: '새로운 출금 요청이 들어왔을 때 알림을 받습니다.',
    channels: {
      email: true,
      push: true,
      sms: true
    }
  },
  {
    id: 3,
    title: '시스템 점검 알림',
    description: '시스템 점검 및 업데이트 관련 알림을 받습니다.',
    channels: {
      email: true,
      push: true,
      sms: false
    }
  },
  {
    id: 4,
    title: '보안 알림',
    description: '계정 보안 관련 알림을 받습니다.',
    channels: {
      email: true,
      push: true,
      sms: true
    }
  },
  {
    id: 5,
    title: '이벤트 알림',
    description: '새로운 이벤트 및 프로모션 알림을 받습니다.',
    channels: {
      email: true,
      push: true,
      sms: false
    }
  }
];

export default function NotificationsPage() {
  const [settings, setSettings] = useState(notificationSettings);

  const toggleChannel = (settingId: number, channel: 'email' | 'push' | 'sms') => {
    setSettings(settings.map(setting => {
      if (setting.id === settingId) {
        return {
          ...setting,
          channels: {
            ...setting.channels,
            [channel]: !setting.channels[channel]
          }
        };
      }
      return setting;
    }));
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">알림 설정</h1>
        <p className="text-gray-600">관리자 알림 설정을 관리합니다.</p>
      </div>

      <div className="space-y-4">
        {settings.map((setting) => (
          <div key={setting.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{setting.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{setting.description}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${
                    setting.channels.email ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}
                  onClick={() => toggleChannel(setting.id, 'email')}
                >
                  <Mail size={16} />
                  <span className="text-sm">이메일</span>
                </button>
                <button
                  className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${
                    setting.channels.push ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}
                  onClick={() => toggleChannel(setting.id, 'push')}
                >
                  <Bell size={16} />
                  <span className="text-sm">푸시</span>
                </button>
                <button
                  className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${
                    setting.channels.sms ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}
                  onClick={() => toggleChannel(setting.id, 'sms')}
                >
                  <MessageSquare size={16} />
                  <span className="text-sm">SMS</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 알림 테스트 섹션 */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">알림 테스트</h2>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <select className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">알림 유형 선택</option>
              {settings.map(setting => (
                <option key={setting.id} value={setting.id}>{setting.title}</option>
              ))}
            </select>
            <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              <AlertCircle size={20} />
              <span>테스트 알림 보내기</span>
            </button>
          </div>
          <p className="text-sm text-gray-500">
            선택한 알림 유형에 대해 활성화된 채널로 테스트 알림을 보냅니다.
          </p>
        </div>
      </div>
    </div>
  );
} 