import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            베팅 사이트에 오신 것을 환영합니다
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            최고의 베팅 경험을 제공합니다
          </p>
          <div className="space-x-4">
            <Link 
              href="/admin/dashboard"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              관리자 대시보드
            </Link>
            <Link 
              href="/login"
              className="inline-block bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              로그인
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}