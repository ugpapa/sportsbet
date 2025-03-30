"use client";
import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal } from 'lucide-react';

// 샘플 데이터
const bettingHistory = [
  {
    id: 1,
    username: 'user123',
    match: '맨유 vs 리버풀',
    betType: '승패',
    selection: '맨유 승',
    amount: 100000,
    odds: 2.5,
    status: '완료',
    date: '2024-03-22 14:30',
    result: '승',
    winAmount: 250000
  },
  {
    id: 2,
    username: 'betking',
    match: '레이커스 vs 워리어스',
    betType: '승패',
    selection: '워리어스 승',
    amount: 50000,
    odds: 1.8,
    status: '완료',
    date: '2024-03-22 13:45',
    result: '패',
    winAmount: 0
  },
  {
    id: 3,
    username: 'winmaster',
    match: '다저스 vs 양키스',
    betType: '승패',
    selection: '다저스 승',
    amount: 200000,
    odds: 3.2,
    status: '완료',
    date: '2024-03-22 12:20',
    result: '승',
    winAmount: 640000
  },
  {
    id: 4,
    username: 'sports999',
    match: 'PSG vs 바이에른',
    betType: '승패',
    selection: 'PSG 승',
    amount: 150000,
    odds: 2.1,
    status: '완료',
    date: '2024-03-22 11:30',
    result: '패',
    winAmount: 0
  },
  {
    id: 5,
    username: 'goal777',
    match: '아스널 vs 첼시',
    betType: '승패',
    selection: '아스널 승',
    amount: 300000,
    odds: 2.4,
    status: '완료',
    date: '2024-03-22 10:15',
    result: '승',
    winAmount: 720000
  },
  {
    id: 6,
    username: 'livebet',
    match: '토트넘 vs 뉴캐슬',
    betType: '승패',
    selection: '토트넘 승',
    amount: 180000,
    odds: 2.3,
    status: '진행중',
    date: '2024-03-22 15:45',
    result: '-',
    winAmount: 0
  }
];

export default function BettingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('전체');

  const filteredBets = bettingHistory.filter(bet => {
    const matchesSearch = bet.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bet.match.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '전체' || bet.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    // 날짜 문자열을 Date 객체로 변환하여 비교
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">베팅 내역</h1>
        <p className="text-gray-600">전체 베팅 수: {bettingHistory.length}건</p>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="회원명 또는 경기 검색..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="전체">전체</option>
              <option value="완료">완료</option>
              <option value="진행중">진행중</option>
              <option value="취소">취소</option>
            </select>
            <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              <Filter size={20} />
              <span>필터</span>
            </button>
          </div>
        </div>
      </div>

      {/* 베팅 내역 테이블 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">번호</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">회원명</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">경기</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">베팅 종류</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">선택</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">베팅 금액</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">배당률</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">결과</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">당첨금</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">베팅 일시</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBets.map((bet, index) => (
              <tr key={bet.id}>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                  {filteredBets.length - index}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{bet.username}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{bet.match}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{bet.betType}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{bet.selection}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm text-gray-900">{bet.amount.toLocaleString()}원</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-500">{bet.odds}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    bet.result === '승' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {bet.result}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {bet.status === '진행중' ? (
                    <div className="text-sm text-gray-400">-</div>
                  ) : (
                    <div className={`text-sm ${bet.winAmount > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                      {bet.winAmount > 0 ? '+' : ''}{bet.winAmount.toLocaleString()}원
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {bet.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    bet.status === '완료' ? 'bg-green-100 text-green-800' :
                    bet.status === '진행중' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {bet.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 