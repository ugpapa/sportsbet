"use client";
import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X, ChevronDown, ChevronUp } from 'lucide-react';

// 샘플 공지사항 데이터
const initialNotices = [
  {
    id: 1,
    title: '시스템 점검 안내',
    content: '2024년 3월 25일 02:00 ~ 06:00 시스템 점검이 진행됩니다.',
    isImportant: true,
    createdAt: '2024-03-22 14:30',
    createdBy: '관리자1',
    views: 245
  },
  {
    id: 2,
    title: '입금 계좌 변경 안내',
    content: '3월 26일부터 입금 계좌가 변경됩니다. 자세한 내용은 본문을 확인해주세요.',
    isImportant: true,
    createdAt: '2024-03-22 11:20',
    createdBy: '관리자2',
    views: 188
  },
  {
    id: 3,
    title: '이벤트 당첨자 발표',
    content: '3월 이벤트 당첨자를 발표합니다. 당첨되신 분들은 마이페이지에서 확인해주세요.',
    isImportant: false,
    createdAt: '2024-03-21 16:45',
    createdBy: '관리자1',
    views: 156
  }
];

export default function NoticePage() {
  const [notices, setNotices] = useState(initialNotices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNotice, setEditingNotice] = useState<any>(null);
  const [expandedNotices, setExpandedNotices] = useState<number[]>([]);
  const [newNotice, setNewNotice] = useState({
    title: '',
    content: '',
    isImportant: false
  });

  // 내용 길이 체크 (3줄 이상인지)
  const isContentLong = (content: string) => {
    return content.split('\n').length > 3 || content.length > 200;
  };

  // 내용 줄임 처리
  const truncateContent = (content: string) => {
    const lines = content.split('\n');
    if (lines.length > 3) {
      return lines.slice(0, 3).join('\n') + '...';
    }
    if (content.length > 200) {
      return content.slice(0, 200) + '...';
    }
    return content;
  };

  // 더보기/접기 토글
  const toggleExpand = (noticeId: number) => {
    setExpandedNotices(prev => 
      prev.includes(noticeId)
        ? prev.filter(id => id !== noticeId)
        : [...prev, noticeId]
    );
  };

  const handleAddNotice = () => {
    if (!newNotice.title || !newNotice.content) {
      alert('제목과 내용을 모두 입력해주세요.');
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

    const notice = {
      id: notices.length + 1,
      ...newNotice,
      createdAt: now,
      createdBy: '관리자1', // 실제로는 로그인된 관리자 정보
      views: 0
    };

    setNotices([notice, ...notices]);
    setIsModalOpen(false);
    setNewNotice({
      title: '',
      content: '',
      isImportant: false
    });
  };

  const handleEditNotice = () => {
    if (!editingNotice.title || !editingNotice.content) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setNotices(notices.map(notice => 
      notice.id === editingNotice.id ? editingNotice : notice
    ));
    setEditingNotice(null);
  };

  const handleDeleteNotice = (id: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setNotices(notices.filter(notice => notice.id !== id));
    }
  };

  const filteredNotices = notices.filter(notice =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notice.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">공지사항 관리</h1>
            <p className="text-gray-600">전체 공지: {notices.length}개</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
          >
            <Plus size={20} className="mr-2" />
            공지사항 작성
          </button>
        </div>
      </div>

      {/* 검색 */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="제목 또는 내용으로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* 공지사항 목록 */}
      <div className="space-y-4">
        {filteredNotices.map((notice) => (
          <div key={notice.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {notice.isImportant && (
                    <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">중요</span>
                  )}
                  <h3 className="text-lg font-semibold">{notice.title}</h3>
                </div>
                <div className="mb-4 relative">
                  <div className={`text-gray-600 whitespace-pre-line ${
                    !expandedNotices.includes(notice.id) && isContentLong(notice.content)
                      ? 'line-clamp-3'
                      : ''
                  }`}>
                    {notice.content}
                  </div>
                  {isContentLong(notice.content) && (
                    <div className={`${
                      !expandedNotices.includes(notice.id)
                        ? 'bg-gradient-to-b from-transparent to-white absolute bottom-0 left-0 right-0 h-12 flex items-end justify-center pb-1'
                        : 'text-center mt-2'
                    }`}>
                      <button
                        onClick={() => toggleExpand(notice.id)}
                        className="inline-flex items-center px-3 py-1 text-sm text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                      >
                        {expandedNotices.includes(notice.id) ? (
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
                  <span>작성자: {notice.createdBy}</span>
                  <span>작성일: {notice.createdAt}</span>
                  <span>조회수: {notice.views}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEditingNotice(notice)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  title="수정"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDeleteNotice(notice.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                  title="삭제"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 공지사항 작성/수정 모달 */}
      {(isModalOpen || editingNotice) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingNotice ? '공지사항 수정' : '공지사항 작성'}
              </h2>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingNotice(null);
                  setNewNotice({ title: '', content: '', isImportant: false });
                }}
                title="닫기"
                aria-label="모달 닫기"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  제목
                </label>
                <input
                  type="text"
                  value={editingNotice ? editingNotice.title : newNotice.title}
                  onChange={(e) => {
                    if (editingNotice) {
                      setEditingNotice({ ...editingNotice, title: e.target.value });
                    } else {
                      setNewNotice({ ...newNotice, title: e.target.value });
                    }
                  }}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="공지사항 제목 입력"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  내용
                </label>
                <textarea
                  value={editingNotice ? editingNotice.content : newNotice.content}
                  onChange={(e) => {
                    if (editingNotice) {
                      setEditingNotice({ ...editingNotice, content: e.target.value });
                    } else {
                      setNewNotice({ ...newNotice, content: e.target.value });
                    }
                  }}
                  className="w-full border rounded-lg px-3 py-2 h-48"
                  placeholder="공지사항 내용 입력"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={editingNotice ? editingNotice.isImportant : newNotice.isImportant}
                  onChange={(e) => {
                    if (editingNotice) {
                      setEditingNotice({ ...editingNotice, isImportant: e.target.checked });
                    } else {
                      setNewNotice({ ...newNotice, isImportant: e.target.checked });
                    }
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  중요 공지로 설정
                </label>
              </div>

              <div className="pt-4">
                <button
                  onClick={editingNotice ? handleEditNotice : handleAddNotice}
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  {editingNotice ? '수정하기' : '등록하기'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 