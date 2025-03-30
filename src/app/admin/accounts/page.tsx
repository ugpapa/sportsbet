"use client";
import React, { useState } from 'react';
import { X } from 'lucide-react';

// 샘플 계좌 데이터
const initialAccounts = [
  {
    id: 1,
    bankName: '신한은행',
    accountNumber: '110-123-456789',
    accountHolder: '관리자',
    isMain: true,
    isActive: true,
    registeredAt: '2024-03-22 14:30',
    registeredBy: '관리자1',
    registeredIp: '172.16.0.100'
  },
  {
    id: 2,
    bankName: '국민은행',
    accountNumber: '123-45-6789012',
    accountHolder: '관리자',
    isMain: false,
    isActive: true,
    registeredAt: '2024-03-22 14:35',
    registeredBy: '관리자1',
    registeredIp: '172.16.0.100'
  }
];

export default function AccountsPage() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMainConfirmModalOpen, setIsMainConfirmModalOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);
  const [newAccount, setNewAccount] = useState({
    bankName: '',
    accountNumber: '',
    accountHolder: ''
  });

  const handleAddAccount = () => {
    // 실제로는 API 호출로 계좌 등록
    const now = new Date().toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const newAccountData = {
      id: accounts.length + 1,
      ...newAccount,
      isMain: accounts.length === 0, // 첫 번째 계좌는 자동으로 주계좌로 설정
      isActive: true,
      registeredAt: now,
      registeredBy: '관리자1', // 실제로는 로그인된 관리자 정보
      registeredIp: '172.16.0.100' // 실제로는 현재 IP
    };

    setAccounts([...accounts, newAccountData]);
    setIsModalOpen(false);
    setNewAccount({ bankName: '', accountNumber: '', accountHolder: '' });
  };

  const handleSetMainAccount = (accountId: number) => {
    setAccounts(accounts.map(account => ({
      ...account,
      isMain: account.id === accountId
    })));
    setIsMainConfirmModalOpen(false);
    setSelectedAccountId(null);
  };

  const openMainConfirmModal = (accountId: number) => {
    setSelectedAccountId(accountId);
    setIsMainConfirmModalOpen(true);
  };

  const handleToggleActive = (accountId: number) => {
    setAccounts(accounts.map(account => 
      account.id === accountId 
        ? { ...account, isActive: !account.isActive }
        : account
    ));
  };

  const handleDeleteAccount = (accountId: number) => {
    // 주계좌는 삭제할 수 없음
    if (accounts.find(a => a.id === accountId)?.isMain) {
      alert('주계좌는 삭제할 수 없습니다.');
      return;
    }
    setAccounts(accounts.filter(account => account.id !== accountId));
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">계좌 관리</h1>
            <p className="text-gray-600">전체 등록 계좌: {accounts.length}개</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
          >
            <X size={20} className="mr-2" />
            계좌 등록
          </button>
        </div>
      </div>

      {/* 계좌 목록 테이블 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">은행명</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">계좌번호</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">예금주</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">주계좌</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">등록일</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">등록관리자</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP주소</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-gray-900">{account.bankName}</td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{account.accountNumber}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-900">{account.accountHolder}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {account.isMain ? (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">주계좌</span>
                    ) : (
                      <button
                        onClick={() => openMainConfirmModal(account.id)}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        주계좌로 설정
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      account.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {account.isActive ? '활성' : '비활성'}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-400">{account.registeredAt}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">{account.registeredBy}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-mono text-gray-400">{account.registeredIp}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleActive(account.id)}
                        className={`p-1 rounded ${
                          account.isActive 
                            ? 'text-red-600 hover:bg-red-100' 
                            : 'text-green-600 hover:bg-green-100'
                        }`}
                        title={account.isActive ? '비활성화' : '활성화'}
                      >
                        <X size={16} />
                      </button>
                      {!account.isMain && (
                        <button
                          onClick={() => handleDeleteAccount(account.id)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                          title="삭제"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 계좌 등록 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">계좌 등록</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                title="닫기"
                aria-label="모달 닫기"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  은행명
                </label>
                <input
                  type="text"
                  value={newAccount.bankName}
                  onChange={(e) => setNewAccount({ ...newAccount, bankName: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="은행명 입력"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  계좌번호
                </label>
                <input
                  type="text"
                  value={newAccount.accountNumber}
                  onChange={(e) => setNewAccount({ ...newAccount, accountNumber: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="계좌번호 입력 (- 포함)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  예금주
                </label>
                <input
                  type="text"
                  value={newAccount.accountHolder}
                  onChange={(e) => setNewAccount({ ...newAccount, accountHolder: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="예금주명 입력"
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={handleAddAccount}
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  등록하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 주계좌 설정 확인 모달 */}
      {isMainConfirmModalOpen && selectedAccountId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">주계좌 설정</h2>
              <button 
                onClick={() => {
                  setIsMainConfirmModalOpen(false);
                  setSelectedAccountId(null);
                }}
                title="닫기"
                aria-label="모달 닫기"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                선택한 계좌를 주계좌로 설정하시겠습니까?<br />
                주계좌는 공지사항과 입금요청 페이지에 표시됩니다.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-gray-500">은행명</div>
                  <div className="col-span-2 font-medium">
                    {accounts.find(a => a.id === selectedAccountId)?.bankName}
                  </div>
                  <div className="text-gray-500">계좌번호</div>
                  <div className="col-span-2 font-medium">
                    {accounts.find(a => a.id === selectedAccountId)?.accountNumber}
                  </div>
                  <div className="text-gray-500">예금주</div>
                  <div className="col-span-2 font-medium">
                    {accounts.find(a => a.id === selectedAccountId)?.accountHolder}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setIsMainConfirmModalOpen(false);
                    setSelectedAccountId(null);
                  }}
                  className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  onClick={() => handleSetMainAccount(selectedAccountId)}
                  className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  설정하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 