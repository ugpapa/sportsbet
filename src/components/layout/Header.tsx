import { Menu } from 'lucide-react';

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  isMobile: boolean;
}

export default function Header({ isSidebarOpen, setIsSidebarOpen, isMobile }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          {isMobile && (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <Menu className="h-6 w-6" />
            </button>
          )}
          <h1 className="text-xl font-semibold text-gray-800 ml-2">관리자 패널</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* 추가적인 헤더 요소들 (알림, 프로필 등) */}
        </div>
      </div>
    </header>
  );
} 