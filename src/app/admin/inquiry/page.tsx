"use client";
import React, { useState } from 'react';
import { Search, MessageSquare, X, ChevronDown, ChevronUp } from 'lucide-react';

// 샘플 문의 데이터
const initialInquiries = [
  {
    id: 1,
    userId: 'user123',
    nickname: '홍길동',
    title: '출금 관련 문의',
    content: '출금 신청한 지 24시간이 지났는데 아직 처리가 안됐습니다.',
    category: '출금',
    status: '대기중',
    createdAt: '2024-03-22 14:30',
    response: null,
    respondedAt: null,
    respondedBy: null
  },
  {
    id: 2,
    userId: 'user456',
    nickname: '김철수',
    title: '입금 확인 요청',
    content: '입금했는데 반영이 안됩니다. 확인 부탁드립니다.',
    category: '입금',
    status: '답변완료',
    createdAt: '2024-03-22 11:20',
    response: '입금 확인 완료했습니다. 현재 반영되어 있습니다.',
    respondedAt: '2024-03-22 11:35',
    respondedBy: '관리자1'
  },
  {
    id: 3,
    userId: 'user789',
    nickname: '이영희',
    title: '베팅 취소 문의',
    content: '실수로 잘못 베팅했는데 취소 가능한가요?',
    category: '베팅',
    status: '대기중',
    createdAt: '2024-03-22 10:15',
    response: null,
    respondedAt: null,
    respondedBy: null
  }
];

export default function InquiryPage() {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('전체');
  const [categoryFilter, setCategoryFilter] = useState('전체');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [response, setResponse] = useState('');
  const [expandedInquiries, setExpandedInquiries] = useState<number[]>([]);

  // 내용 길이 체크 (3줄 이상인지)
  const isContentLong = (content: string) => {
    return content.split('\n').length > 3 || content.length > 200;
  };

  // 더보기/접기 토글
  const toggleExpand = (inquiryId: number) => {
    setExpandedInquiries(prev => 
      prev.includes(inquiryId)
        ? prev.filter(id => id !== inquiryId)
        : [...prev, inquiryId]
    );
  };

  const handleResponse = () => {
    if (!response.trim()) {
      alert('답변 내용을 입력해주세요.');
      return;
    }

    const now = new Date().toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    setInquiries(inquiries.map(inquiry => 
      inquiry.id === selectedInquiry.id
        ? {
            ...inquiry,
            status: '답변완료',
            response: response,
            respondedAt: now,
            respondedBy: '관리자1' // 실제로는 로그인된 관리자 정보
          }
        : inquiry
    ));

    setIsModalOpen(false);
    setSelectedInquiry(null);
    setResponse('');
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = 
      inquiry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.nickname.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '전체' || inquiry.status === statusFilter;
    const matchesCategory = categoryFilter === '전체' || inquiry.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(new Set(inquiries.map(inquiry => inquiry.category)));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">1:1 문의 관리</h1>
        <p className="text-gray-600">
          전체 문의: {inquiries.length}개 (대기중: {inquiries.filter(i => i.status === '대기중').length}개)
        </p>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="제목, 내용, 회원ID, 닉네임 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                title="카테고리 필터"
                aria-label="카테고리 필터"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none border rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="전체">전체 카테고리</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
            <div className="relative">
              <select
                title="상태 필터"
                aria-label="상태 필터"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none border rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="전체">전체 상태</option>
                <option value="대기중">대기중</option>
                <option value="답변완료">답변완료</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* 문의 목록 */}
      <div className="space-y-4">
        {filteredInquiries.map((inquiry) => (
          <div key={inquiry.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    inquiry.status === '대기중' 
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {inquiry.status}
                  </span>
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                    {inquiry.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{inquiry.title}</h3>
                
                {/* 문의 내용 */}
                <div className="relative mb-4">
                  <div className={`text-gray-600 whitespace-pre-line ${
                    !expandedInquiries.includes(inquiry.id) && isContentLong(inquiry.content)
                      ? 'line-clamp-3'
                      : ''
                  }`}>
                    {inquiry.content}
                  </div>
                  {isContentLong(inquiry.content) && (
                    <div className={`${
                      !expandedInquiries.includes(inquiry.id)
                        ? 'bg-gradient-to-b from-transparent to-white absolute bottom-0 left-0 right-0 h-12 flex items-end justify-center pb-1'
                        : 'text-center mt-2'
                    }`}>
                      <button
                        onClick={() => toggleExpand(inquiry.id)}
                        className="inline-flex items-center px-3 py-1 text-sm text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                      >
                        {expandedInquiries.includes(inquiry.id) ? (
                          <>
                            접기
                            <ChevronUp size={14} className="ml-1" />
                          </>
                        ) : (
                          <>
                            더보기
                            <ChevronDown size={14} className="ml-1" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span>회원ID: {inquiry.userId}</span>
                  <span>닉네임: {inquiry.nickname}</span>
                  <span>문의일시: {inquiry.createdAt}</span>
                </div>
              </div>
              {inquiry.status === '대기중' && (
                <button
                  onClick={() => {
                    setSelectedInquiry(inquiry);
                    setIsModalOpen(true);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
                >
                  <MessageSquare size={16} className="mr-2" />
                  답변하기
                </button>
              )}
            </div>

            {/* 답변 내용 */}
            {inquiry.response && (
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center text-sm text-gray-500 space-x-4 mb-2">
                  <span>답변자: {inquiry.respondedBy}</span>
                  <span>답변일시: {inquiry.respondedAt}</span>
                </div>
                <p className="text-gray-600 whitespace-pre-line">{inquiry.response}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 답변 모달 */}
      {isModalOpen && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">문의 답변</h2>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedInquiry(null);
                  setResponse('');
                }}
                title="닫기"
                aria-label="모달 닫기"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center text-sm text-gray-500 space-x-4 mb-2">
                  <span>회원ID: {selectedInquiry.userId}</span>
                  <span>닉네임: {selectedInquiry.nickname}</span>
                  <span>문의일시: {selectedInquiry.createdAt}</span>
                </div>
                <h3 className="font-medium mb-2">{selectedInquiry.title}</h3>
                <p className="text-gray-600 whitespace-pre-line">{selectedInquiry.content}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  답변 내용
                </label>
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 h-48"
                  placeholder="답변 내용을 입력하세요"
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={handleResponse}
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  답변 등록
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 