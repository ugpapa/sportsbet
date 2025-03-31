import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';

const menuItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: '대시보드' },
  { href: '/admin/users', icon: Users, label: '회원 관리' },
  { href: '/admin/betting', icon: DollarSign, label: '베팅 관리' },
  { href: '/admin/settings', icon: Settings, label: '설정' },
  { href: '/admin/support', icon: HelpCircle, label: '고객 지원' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-full bg-white shadow-lg">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b">
        <span className="text-xl font-bold text-gray-800">ADMIN</span>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        <div className="px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 w-full p-4 border-t">
        <button
          onClick={() => {/* 로그아웃 처리 */}}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          로그아웃
        </button>
      </div>
    </div>
  );
} 