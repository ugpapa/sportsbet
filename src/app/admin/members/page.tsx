"use client";
import React, { useState } from 'react';
import { Search, Edit, Trash2 } from 'lucide-react';

interface BettingHistory {
  id: number;
  date: string;
  sport: string;
  match: string;
  amount: number;
  odds: number;
  result: string;
  winLoss: number;
  status: string;
}

interface Member {
  id: string;
  username: string;
  email: string;
  phone: string;
  totalDeposit: number;
  balance: number;
  joinDate: string;
  lastLogin: string;
  status: string;
  bettingHistory: BettingHistory[];
}

// 샘플 회원 데이터
const members = [
  {
    id: 'user123',
    username: '행운의도박꾼',
    email: 'lucky@example.com',
    phone: '010-1234-5678',
    totalDeposit: 5000000,
    balance: 2500000,
    joinDate: '2024-01-15',
    lastLogin: '2024-03-07 14:30',
    status: '활성',
    bettingHistory: [
      {
        id: 1,
        date: '2024-03-07',
        sport: '축구',
        match: '맨유 vs 리버풀',
        amount: 100000,
        odds: 2.5,
        result: '승',
        winLoss: 150000,
        status: '완료'
      },
      {
        id: 2,
        date: '2024-03-06',
        sport: '농구',
        match: '레이커스 vs 워리어스',
        amount: 50000,
        odds: 1.8,
        result: '패',
        winLoss: -50000,
        status: '완료'
      }
    ]
  },
  {
    id: 'user456',
    username: '베팅마스터',
    email: 'betting@example.com',
    phone: '010-2345-6789',
    totalDeposit: 3000000,
    balance: 1800000,
    joinDate: '2024-02-01',
    lastLogin: '2024-03-07 15:45',
    status: '활성',
    bettingHistory: [
      {
        id: 3,
        date: '2024-03-07',
        sport: '야구',
        match: '다저스 vs 양키스',
        amount: 200000,
        odds: 3.2,
        result: '승',
        winLoss: 440000,
        status: '완료'
      }
    ]
  },
  {
    id: 'user789',
    username: '스포츠팬',
    email: 'sports@example.com',
    phone: '010-3456-7890',
    totalDeposit: 10000000,
    balance: 7500000,
    joinDate: '2023-12-20',
    lastLogin: '2024-03-07 16:20',
    status: '활성',
    bettingHistory: [
      {
        id: 4,
        date: '2024-03-07',
        sport: '축구',
        match: '레알마드리드 vs 바르셀로나',
        amount: 500000,
        odds: 1.5,
        result: '승',
        winLoss: 250000,
        status: '완료'
      }
    ]
  },
  {
    id: 'user101',
    username: '승리조',
    email: 'win@example.com',
    phone: '010-4567-8901',
    totalDeposit: 2000000,
    balance: 1200000,
    joinDate: '2024-02-15',
    lastLogin: '2024-03-07 17:00',
    status: '활성',
    bettingHistory: [
      {
        id: 5,
        date: '2024-03-07',
        sport: '농구',
        match: '넷츠 vs 셀틱스',
        amount: 100000,
        odds: 2.8,
        result: '패',
        winLoss: -100000,
        status: '완료'
      }
    ]
  },
  {
    id: 'user102',
    username: '베팅프로',
    email: 'pro@example.com',
    phone: '010-5678-9012',
    totalDeposit: 8000000,
    balance: 9500000,
    joinDate: '2023-11-30',
    lastLogin: '2024-03-07 17:30',
    status: '활성',
    bettingHistory: [
      {
        id: 6,
        date: '2024-03-07',
        sport: '야구',
        match: '기아 vs 두산',
        amount: 300000,
        odds: 2.1,
        result: '승',
        winLoss: 330000,
        status: '완료'
      }
    ]
  },
  {
    id: 'user103',
    username: '스포츠매니아',
    email: 'mania@example.com',
    phone: '010-6789-0123',
    totalDeposit: 15000000,
    balance: 12000000,
    joinDate: '2023-10-15',
    lastLogin: '2024-03-07 18:00',
    status: '활성',
    bettingHistory: [
      {
        id: 7,
        date: '2024-03-07',
        sport: '축구',
        match: 'PSG vs 바이에른',
        amount: 1000000,
        odds: 1.9,
        result: '승',
        winLoss: 900000,
        status: '완료'
      }
    ]
  },
  {
    id: 'user104',
    username: '베팅신인',
    email: 'new@example.com',
    phone: '010-7890-1234',
    totalDeposit: 1000000,
    balance: 800000,
    joinDate: '2024-03-01',
    lastLogin: '2024-03-07 18:30',
    status: '활성',
    bettingHistory: [
      {
        id: 8,
        date: '2024-03-07',
        sport: '농구',
        match: '워리어스 vs 선스',
        amount: 50000,
        odds: 2.3,
        result: '패',
        winLoss: -50000,
        status: '완료'
      }
    ]
  },
  {
    id: 'user105',
    username: '스포츠전문가',
    email: 'expert@example.com',
    phone: '010-8901-2345',
    totalDeposit: 12000000,
    balance: 15000000,
    joinDate: '2023-09-20',
    lastLogin: '2024-03-07 19:00',
    status: '활성',
    bettingHistory: [
      {
        id: 9,
        date: '2024-03-07',
        sport: '야구',
        match: 'LG vs SSG',
        amount: 800000,
        odds: 2.7,
        result: '승',
        winLoss: 1360000,
        status: '완료'
      }
    ]
  },
  {
    id: 'user106',
    username: '베팅고수',
    email: 'master@example.com',
    phone: '010-9012-3456',
    totalDeposit: 25000000,
    balance: 30000000,
    joinDate: '2023-08-10',
    lastLogin: '2024-03-07 19:30',
    status: '활성',
    bettingHistory: [
      {
        id: 10,
        date: '2024-03-07',
        sport: '축구',
        match: '아스널 vs 첼시',
        amount: 2000000,
        odds: 2.4,
        result: '승',
        winLoss: 2800000,
        status: '완료'
      }
    ]
  },
  {
    id: 'user107',
    username: '스포츠매니저',
    email: 'manager@example.com',
    phone: '010-0123-4567',
    totalDeposit: 5000000,
    balance: 3500000,
    joinDate: '2024-02-20',
    lastLogin: '2024-03-07 20:00',
    status: '활성',
    bettingHistory: [
      {
        id: 11,
        date: '2024-03-07',
        sport: '농구',
        match: '버킹스 vs 76ers',
        amount: 150000,
        odds: 2.0,
        result: '패',
        winLoss: -150000,
        status: '완료'
      }
    ]
  },
  {
    id: 'user108',
    username: '베팅스타',
    email: 'star@example.com',
    phone: '010-1234-5678',
    totalDeposit: 18000000,
    balance: 22000000,
    joinDate: '2023-07-05',
    lastLogin: '2024-03-07 20:30',
    status: '활성',
    bettingHistory: [
      {
        id: 12,
        date: '2024-03-07',
        sport: '야구',
        match: 'KT vs NC',
        amount: 1200000,
        odds: 2.6,
        result: '승',
        winLoss: 1920000,
        status: '완료'
      }
    ]
  },
  {
    id: 'user109',
    username: '스포츠킹',
    email: 'king@example.com',
    phone: '010-2345-6789',
    totalDeposit: 30000000,
    balance: 35000000,
    joinDate: '2023-06-15',
    lastLogin: '2024-03-07 21:00',
    status: '활성',
    bettingHistory: [
      {
        id: 13,
        date: '2024-03-07',
        sport: '축구',
        match: '인터밀란 vs AC밀란',
        amount: 3000000,
        odds: 2.2,
        result: '승',
        winLoss: 3600000,
        status: '완료'
      }
    ]
  }
];

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [historySearchTerm, setHistorySearchTerm] = useState('');
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deactivateForm, setDeactivateForm] = useState({
    adminName: '',
    adminPhone: '',
    reason: ''
  });
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    phone: ''
  });

  // 회원 필터링 및 정렬
  const filteredMembers = members
    .filter(member =>
      member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm)
    )
    .sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime());

  // 히스토리 필터링
  const filteredHistory = selectedMember?.bettingHistory.filter(history =>
    history.sport.toLowerCase().includes(historySearchTerm.toLowerCase()) ||
    history.match.toLowerCase().includes(historySearchTerm.toLowerCase())
  ) || [];

  // 히스토리 모달 열기
  const openHistoryModal = (member: Member) => {
    setSelectedMember(member);
    setShowHistoryModal(true);
    setHistorySearchTerm('');
  };

  // 비활성화 모달 열기
  const openDeactivateModal = (member: Member) => {
    setSelectedMember(member);
    setShowDeactivateModal(true);
    setDeactivateForm({
      adminName: '',
      adminPhone: '',
      reason: ''
    });
  };

  // 수정 모달 열기
  const openEditModal = (member: Member) => {
    setSelectedMember(member);
    setEditForm({
      username: member.username,
      email: member.email,
      phone: member.phone
    });
    setShowEditModal(true);
  };

  // 비활성화 처리
  const handleDeactivate = () => {
    if (!deactivateForm.adminName || !deactivateForm.adminPhone || !deactivateForm.reason) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    // 여기에 실제 비활성화 처리 로직 추가
    console.log('회원 비활성화 처리:', {
      member: selectedMember,
      ...deactivateForm
    });

    setShowDeactivateModal(false);
    alert('회원이 비활성화되었습니다. 3개월 후 데이터가 삭제됩니다.');
  };

  // 회원 정보 수정 처리
  const handleEdit = () => {
    if (!editForm.username || !editForm.email || !editForm.phone) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    // 여기에 실제 수정 처리 로직 추가
    console.log('회원 정보 수정:', {
      member: selectedMember,
      ...editForm
    });

    setShowEditModal(false);
    alert('회원 정보가 수정되었습니다.');
  };

  // 비밀번호 초기화 처리
  const handlePasswordReset = () => {
    if (!confirm('비밀번호를 초기화하고 텔레그램으로 새 비밀번호 설정 링크를 보내시겠습니까?')) {
      return;
    }

    // 여기에 실제 비밀번호 초기화 및 텔레그램 발송 로직 추가
    console.log('비밀번호 초기화:', {
      member: selectedMember
    });

    alert('비밀번호가 초기화되었고, 텔레그램으로 새 비밀번호 설정 링크가 발송되었습니다.');
  };

  return (
    <div className="p-6 space-y-6">
      {/* 회원 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">총 회원</p>
              <p className="text-2xl font-semibold text-gray-900">{members.length}명</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">활성 회원</p>
              <p className="text-2xl font-semibold text-gray-900">
                {members.filter(member => member.status === '활성').length}명
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">비활성 회원</p>
              <p className="text-2xl font-semibold text-gray-900">
                {members.filter(member => member.status === '비활성').length}명
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="회원 검색 (ID, 이메일, 연락처)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* 회원 목록 */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">번호</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">회원 ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">닉네임</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이메일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연락처</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">충전금액</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">잔여금</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">가입일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">최근로그인</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMembers.map((member, index) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                  {filteredMembers.length - index}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{member.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">{member.totalDeposit.toLocaleString()}원</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">{member.balance.toLocaleString()}원</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.joinDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.lastLogin}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => openHistoryModal(member)}
                      className="text-blue-600 hover:text-blue-800"
                      title="배팅 히스토리"
                    >
                      <Search className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => openEditModal(member)}
                      className="text-green-600 hover:text-green-800"
                      title="회원 정보 수정"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => openDeactivateModal(member)}
                      className="text-red-600 hover:text-red-800"
                      title="회원 비활성화"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 히스토리 모달 */}
      {showHistoryModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {selectedMember?.username} 배팅 히스토리
                </h2>
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                  title="모달 닫기"
                >
                  <Search className="h-6 w-6" />
                </button>
              </div>

              {/* 히스토리 검색 */}
              <div className="mb-4 relative">
                <input
                  type="text"
                  placeholder="종목 또는 경기 검색"
                  value={historySearchTerm}
                  onChange={(e) => setHistorySearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              {/* 히스토리 테이블 */}
              <div className="overflow-y-auto max-h-[calc(80vh-200px)]">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase w-16">번호</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">회원 ID</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">배팅 일시</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">종목</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">경기</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">배팅금액</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">배당률</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">결과</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">당첨/손실</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">상태</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredHistory.map((history, index) => (
                      <tr key={history.id}>
                        <td className="px-4 py-2 whitespace-nowrap text-center text-gray-500">
                          {filteredHistory.length - index}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">{selectedMember.id}</td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {history.date}
                          {history.result === '승' && (
                            <span className="ml-2 text-green-600 text-sm">
                              (+{(history.amount * history.odds).toLocaleString()}원)
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">{history.sport}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{history.match}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-right">{history.amount.toLocaleString()}원</td>
                        <td className="px-4 py-2 whitespace-nowrap text-center">{history.odds}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-center">
                          <span className={`px-2 py-1 rounded ${
                            history.result === '승' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {history.result}
                          </span>
                        </td>
                        <td className={`px-4 py-2 whitespace-nowrap text-right ${
                          history.winLoss > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {history.winLoss > 0 ? '+' : ''}{history.winLoss.toLocaleString()}원
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-center">{history.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 비활성화 모달 */}
      {showDeactivateModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Search className="h-6 w-6 text-red-500 mr-2" />
                  회원 비활성화
                </h2>
                <button
                  onClick={() => setShowDeactivateModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                  title="모달 닫기"
                >
                  <Search className="h-6 w-6" />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 mb-2">회원 정보</p>
                <div className="bg-gray-50 p-3 rounded">
                  <p><span className="font-medium">ID:</span> {selectedMember?.id}</p>
                  <p><span className="font-medium">닉네임:</span> {selectedMember?.username}</p>
                  <p><span className="font-medium">이메일:</span> {selectedMember?.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    관리자 이름
                  </label>
                  <input
                    type="text"
                    value={deactivateForm.adminName}
                    onChange={(e) => setDeactivateForm({ ...deactivateForm, adminName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="관리자 이름을 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    관리자 연락처
                  </label>
                  <input
                    type="tel"
                    value={deactivateForm.adminPhone}
                    onChange={(e) => setDeactivateForm({ ...deactivateForm, adminPhone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="관리자 연락처를 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    비활성화 사유
                  </label>
                  <textarea
                    value={deactivateForm.reason}
                    onChange={(e) => setDeactivateForm({ ...deactivateForm, reason: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows={4}
                    placeholder="비활성화 사유를 입력하세요"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeactivateModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  onClick={handleDeactivate}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  비활성화 처리
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 수정 모달 */}
      {showEditModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Edit className="h-6 w-6 text-green-500 mr-2" />
                  회원 정보 수정
                </h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                  title="모달 닫기"
                >
                  <Search className="h-6 w-6" />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 mb-2">회원 정보</p>
                <div className="bg-gray-50 p-3 rounded">
                  <p><span className="font-medium">ID:</span> {selectedMember?.id}</p>
                  <p><span className="font-medium">가입일:</span> {selectedMember?.joinDate}</p>
                  <p><span className="font-medium">최근 로그인:</span> {selectedMember?.lastLogin}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    닉네임
                  </label>
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="닉네임을 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이메일 주소
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="이메일 주소를 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    전화번호
                  </label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="전화번호를 입력하세요"
                  />
                </div>

                <div className="pt-4 border-t">
                  <button
                    onClick={handlePasswordReset}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    <Search className="h-5 w-5" />
                    <span>비밀번호 초기화 및 텔레그램 발송</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  정보 수정
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 