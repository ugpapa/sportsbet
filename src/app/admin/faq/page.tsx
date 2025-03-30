"use client";
import React, { useState } from 'react';
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp, X } from 'lucide-react';

// 샘플 FAQ 데이터
const initialFaqs = [
  {
    id: 1,
    question: '출금은 얼마나 걸리나요?',
    answer: '출금 신청 후 평균 10-30분 이내에 처리됩니다. 은행 점검 시간이나 새벽 시간대에는 처리가 지연될 수 있습니다.',
    category: '출금',
    order: 1,
    createdAt: '2024-03-22 14:30',
    updatedAt: '2024-03-22 14:30'
  },
  {
    id: 2,
    question: '최소 입금액은 얼마인가요?',
    answer: '최소 입금액은 10,000원입니다.',
    category: '입금',
    order: 1,
    createdAt: '2024-03-22 11:20',
    updatedAt: '2024-03-22 11:20'
  },
  {
    id: 3,
    question: '베팅 취소가 가능한가요?',
    answer: '경기 시작 전까지만 베팅 취소가 가능합니다. 경기 시작 후에는 취소가 불가능합니다.',
    category: '베팅',
    order: 1,
    createdAt: '2024-03-22 10:15',
    updatedAt: '2024-03-22 10:15'
  }
];

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('전체');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [modalData, setModalData] = useState({
    question: '',
    answer: '',
    category: ''
  });
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  // FAQ 토글
  const toggleFaq = (faqId: number) => {
    setExpandedFaqs(prev => 
      prev.includes(faqId)
        ? prev.filter(id => id !== faqId)
        : [...prev, faqId]
    );
  };

  // FAQ 추가/수정
  const handleSaveFaq = () => {
    if (!modalData.question.trim() || !modalData.answer.trim() || !modalData.category.trim()) {
      alert('모든 필드를 입력해주세요.');
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

    if (editingFaq) {
      // FAQ 수정
      setFaqs(faqs.map(faq =>
        faq.id === editingFaq.id
          ? {
              ...faq,
              ...modalData,
              updatedAt: now
            }
          : faq
      ));
    } else {
      // FAQ 추가
      const newFaq = {
        id: Math.max(0, ...faqs.map(f => f.id)) + 1,
        ...modalData,
        order: 1,
        createdAt: now,
        updatedAt: now
      };
      setFaqs([...faqs, newFaq]);
    }

    closeModal();
  };

  // FAQ 삭제
  const handleDeleteFaq = (faqId: number) => {
    if (window.confirm('정말로 이 FAQ를 삭제하시겠습니까?')) {
      setFaqs(faqs.filter(faq => faq.id !== faqId));
    }
  };

  // 모달 초기화 및 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingFaq(null);
    setModalData({
      question: '',
      answer: '',
      category: ''
    });
  };

  // FAQ 수정 모달 열기
  const openEditModal = (faq: FAQ) => {
    setEditingFaq(faq);
    setModalData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category
    });
    setIsModalOpen(true);
  };

  // 필터링된 FAQ 목록
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === '전체' || faq.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">FAQ 관리</h1>
        <p className="text-gray-600">전체 FAQ: {faqs.length}개</p>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="질문 또는 답변 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <select
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
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
            >
              <Plus size={20} className="mr-2" />
              FAQ 추가
            </button>
          </div>
        </div>
      </div>

      {/* FAQ 목록 */}
      <div className="space-y-4">
        {filteredFaqs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-lg shadow">
            <div
              className="p-4 cursor-pointer flex items-start justify-between"
              onClick={() => toggleFaq(faq.id)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                    {faq.category}
                  </span>
                </div>
                <h3 className="text-lg font-medium pr-8">{faq.question}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(faq);
                  }}
                  className="p-2 text-gray-500 hover:text-blue-500"
                  title="수정"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFaq(faq.id);
                  }}
                  className="p-2 text-gray-500 hover:text-red-500"
                  title="삭제"
                >
                  <Trash2 size={16} />
                </button>
                {expandedFaqs.includes(faq.id) ? (
                  <ChevronUp size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </div>
            </div>
            {expandedFaqs.includes(faq.id) && (
              <div className="px-4 pb-4">
                <div className="pt-2 border-t">
                  <p className="text-gray-600 whitespace-pre-line">{faq.answer}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <span>최종 수정: {faq.updatedAt}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FAQ 추가/수정 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingFaq ? 'FAQ 수정' : 'FAQ 추가'}
              </h2>
              <button onClick={closeModal}>
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  카테고리
                </label>
                <input
                  type="text"
                  value={modalData.category}
                  onChange={(e) => setModalData({ ...modalData, category: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="카테고리를 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  질문
                </label>
                <input
                  type="text"
                  value={modalData.question}
                  onChange={(e) => setModalData({ ...modalData, question: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="질문을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  답변
                </label>
                <textarea
                  value={modalData.answer}
                  onChange={(e) => setModalData({ ...modalData, answer: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 h-48"
                  placeholder="답변을 입력하세요"
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSaveFaq}
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  {editingFaq ? '수정하기' : '추가하기'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 