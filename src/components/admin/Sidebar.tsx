/* eslint-disable */
"use client";
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Settings, 
  LogOut,
  DollarSign,
  Wallet,
  BellRing,
  MessagesSquare,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 임시 관리자 정보 (실제로는 로그인 상태나 API에서 가져와야 함)
const adminInfo = {
  userId: 'admin123',
  nickname: '슈퍼관리자',
  grade: '최고관리자'
};

// 알림이 필요한 메뉴 아이템 정의
const menuItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: '대시보드' },
  { path: '/admin/members', icon: Users, label: '회원관리', hasNotification: true },
  { path: '/admin/betting', icon: DollarSign, label: '배팅내역', hasNotification: true },
  { path: '/admin/transactions/deposit', icon: Wallet, label: '입금요청', hasNotification: true },
  { path: '/admin/transactions/withdraw', icon: CreditCard, label: '출금요청', hasNotification: true },
  { path: '/admin/accounts', icon: Settings, label: '계좌관리' },
  { path: '/admin/notice', icon: BellRing, label: '공지사항' },
  { path: '/admin/inquiry', icon: MessagesSquare, label: '1:1문의', hasNotification: true },
  { path: '/admin/faq', icon: HelpCircle, label: 'FAQ' },
  { path: '/admin/settings', icon: Settings, label: '시스템설정' },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed overflow-y-auto">
      <div className="p-4 border-b border-gray-700">
        <div className="space-y-1">
          <div className="text-sm text-gray-400">관리자정보</div>
          <div className="font-medium">{adminInfo.userId} ({adminInfo.nickname})</div>
          <div className="text-sm text-blue-400">{adminInfo.grade}</div>
        </div>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center px-4 py-3 cursor-pointer ${
                isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              <item.icon className="mr-3" size={20} />
              <span className="flex-1">{item.label}</span>
              {item.hasNotification && (
                <div className="w-2 h-2 bg-red-500 rounded-full ml-2"></div>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-gray-700">
        <div className="flex items-center cursor-pointer hover:text-gray-300">
          <LogOut className="mr-3" size={20} />
          <span>로그아웃</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 