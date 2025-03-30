import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (adminData: {
    username: string;
    nickname: string;
    role: string;
    email: string;
    password: string;
    ipAddresses: string[];
  }) => void;
}

export default function AddAdminModal({ isOpen, onClose, onAdd }: AddAdminModalProps) {
  const [formData, setFormData] = useState({
    username: '',
    nickname: '',
    role: 'admin',
    email: '',
    password: '',
    ipAddresses: [''],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      username: '',
      nickname: '',
      role: 'admin',
      email: '',
      password: '',
      ipAddresses: [''],
    });
  };

  const handleIpChange = (index: number, value: string) => {
    const newIpAddresses = [...formData.ipAddresses];
    newIpAddresses[index] = value;
    setFormData({ ...formData, ipAddresses: newIpAddresses });
  };

  const addIpField = () => {
    setFormData({ ...formData, ipAddresses: [...formData.ipAddresses, ''] });
  };

  const removeIpField = (index: number) => {
    const newIpAddresses = formData.ipAddresses.filter((_, i) => i !== index);
    setFormData({ ...formData, ipAddresses: newIpAddresses });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">관리자 추가</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">아이디</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">닉네임</label>
            <input
              type="text"
              value={formData.nickname}
              onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">역할</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="superadmin">최고 관리자</option>
              <option value="admin">관리자</option>
              <option value="operator">운영자</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">이메일</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">비밀번호</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">IP 주소</label>
            <div className="space-y-2">
              {formData.ipAddresses.map((ip, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={ip}
                    onChange={(e) => handleIpChange(index, e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="예: 192.168.1.100"
                  />
                  {index === formData.ipAddresses.length - 1 ? (
                    <button
                      type="button"
                      onClick={addIpField}
                      className="mt-1 p-2 text-blue-600 hover:text-blue-700"
                      title="IP 주소 추가"
                    >
                      +
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => removeIpField(index)}
                      className="mt-1 p-2 text-red-600 hover:text-red-700"
                      title="IP 주소 삭제"
                    >
                      -
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 