"use client";
import React, { useState } from 'react';
import { Search, Filter, MoreVertical } from 'lucide-react';

// 샘플 데이터
const transactions = [
  { id: 1, username: 'user123', type: '충전', amount: 500000, status: '완료', date: '2024-03-22 14:30' },
  { id: 2, username: 'betking', type: '인출', amount: 1000000, status: '대기중', date: '2024-03-22 13:45' },
  { id: 3, username: 'winmaster', type: '충전', amount: 300000, status: '완료', date: '2024-03-22 12:20' },
  { id: 4, username: 'sports999', type: '인출', amount: 750000, status: '완료', date: '2024-03-22 11:15' },
  { id: 5, username: 'goal777', type: '충전', amount: 200000, status: '대기중', date: '2024-03-22 10:50' },
];

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('전체');
  const [statusFilter, setStatusFilter] = useState('전체');

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === '전체' || transaction.type === typeFilter;
    const matchesStatus = statusFilter === '전체' || transaction.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">입출금 관리</h1>
        <p className="text-gray-600">전체 거래 수: {transactions.length}건</p>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="회원 검색..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              aria-label="거래 유형 필터"
            >
              <option value="전체">전체</option>
              <option value="충전">충전</option>
              <option value="인출">인출</option>
            </select>
            <select
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="거래 상태 필터"
            >
              <option value="전체">전체</option>
              <option value="완료">완료</option>
              <option value="대기중">대기중</option>
            </select>
            <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              <Filter size={20} />
              <span>필터</span>
            </button>
          </div>
        </div>
      </div>

      {/* 거래 목록 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">회원 ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">거래유형</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">금액</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">거래일시</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{transaction.username}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.type === '충전' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-sm text-gray-900">￦{transaction.amount.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.status === '완료' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-gray-500" aria-label="거래 상세 보기">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 