"use client";
import React, { useState } from 'react';
import { Search, Settings, X } from 'lucide-react';

// 관리자 주계좌 정보 (실제로는 API나 전역 상태에서 가져와야 함)
const mainAccount = {
  bankName: '신한은행',
  accountNumber: '110-123-456789',
  accountHolder: '관리자'
};

// 샘플 데이터
const depositRequests = [
  {
    id: 1,
    username: 'user123',
    nickname: '베팅왕',
    amount: 1000000,
    date: '2024-03-22 15:30',
    status: '완료',
    processedBy: '관리자1',
    processedIp: '172.16.0.100',
    processedAt: '2024-03-22 15:32'
  },
  {
    id: 2,
    username: 'betking',
    nickname: '베팅킹',
    amount: 500000,
    date: '2024-03-22 15:25',
    status: '대기중'
  },
  {
    id: 3,
    username: 'winmaster',
    nickname: '승리왕',
    amount: 2000000,
    date: '2024-03-22 15:20',
    status: '완료',
    processedBy: '관리자2',
    processedIp: '172.16.0.101',
    processedAt: '2024-03-22 15:23'
  }
];

export default function DepositPage() {
  const [requests, setRequests] = useState(depositRequests);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleChargeClick = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleConfirmCharge = () => {
    // 실제로는 API 호출로 충전 처리
    const now = new Date().toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    // 더미 IP 주소 목록
    const dummyIps = [
      '172.16.0.100',
      '172.16.0.101',
      '172.16.0.102',
      '172.16.0.103',
      '172.16.0.104'
    ];
    
    // 랜덤하게 IP 선택
    const randomIp = dummyIps[Math.floor(Math.random() * dummyIps.length)];

    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === selectedRequest.id
          ? {
              ...req,
              status: '완료',
              processedBy: '관리자1', // 실제로는 로그인된 관리자 정보
              processedIp: randomIp,
              processedAt: now
            }
          : req
      )
    );

    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">입금 관리</h1>
            <p className="text-gray-600">전체 입금 요청: {requests.length}건</p>
          </div>
        </div>
      </div>

      {/* 입금 요청 테이블 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">입금 요청 리스트</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">회원아이디</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">닉네임</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">요청금액</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">요청시간</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">처리자</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">처리IP</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">처리시간</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{request.username}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">{request.nickname}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-900">{request.amount.toLocaleString()}원</td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-400">{request.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      request.status === '완료' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                    {request.status === '완료' ? request.processedBy : '-'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-mono text-gray-400">
                    {request.status === '완료' ? request.processedIp : '-'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-400">
                    {request.status === '완료' ? request.processedAt : '-'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {request.status === '대기중' && (
                      <button
                        onClick={() => handleChargeClick(request)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        충전하기
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 충전 확인 모달 */}
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">충전 확인</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                title="닫기"
                aria-label="모달 닫기"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">회원아이디:</span>
                  <span className="font-medium">{selectedRequest.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">닉네임:</span>
                  <span>{selectedRequest.nickname}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">충전요청금액:</span>
                  <span className="font-medium">{selectedRequest.amount.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">입금계좌정보:</span>
                  <span className="font-medium">
                    {mainAccount.bankName} {mainAccount.accountNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">예금주:</span>
                  <span>{mainAccount.accountHolder}</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="mb-4 text-gray-700">위 내용으로 충전하시겠습니까?</p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleConfirmCharge}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    충전하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 