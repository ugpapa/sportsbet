import React, { useState } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';

interface AccessControlRule {
  id: string;
  adminId: string;
  publicIp: string;
  privateIps: string[];
  allowedTime: {
    start: string;
    end: string;
  };
  allowedDays: string[];
  createdAt: string;
  isActive: boolean;
}

interface AccessControlProps {
  rules: AccessControlRule[];
  onAdd: (rule: Omit<AccessControlRule, 'id' | 'createdAt'>) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<AccessControlRule>) => void;
}

const DAYS_OF_WEEK = ['월', '화', '수', '목', '금', '토', '일'];

export default function AccessControl({ rules, onAdd, onDelete, onUpdate }: AccessControlProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRule, setEditingRule] = useState<AccessControlRule | null>(null);
  const [formData, setFormData] = useState({
    adminId: '',
    publicIp: '',
    privateIps: [''],
    allowedTime: {
      start: '09:00',
      end: '18:00'
    },
    allowedDays: ['월', '화', '수', '목', '금'],
    isActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRule) {
      onUpdate(editingRule.id, formData);
    } else {
      onAdd(formData);
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingRule(null);
    setFormData({
      adminId: '',
      publicIp: '',
      privateIps: [''],
      allowedTime: {
        start: '09:00',
        end: '18:00'
      },
      allowedDays: ['월', '화', '수', '목', '금'],
      isActive: true
    });
  };

  const handleEdit = (rule: AccessControlRule) => {
    setEditingRule(rule);
    setFormData({
      adminId: rule.adminId,
      publicIp: rule.publicIp,
      privateIps: rule.privateIps,
      allowedTime: rule.allowedTime,
      allowedDays: rule.allowedDays,
      isActive: rule.isActive
    });
    setShowAddModal(true);
  };

  const handleIpChange = (index: number, value: string) => {
    const newPrivateIps = [...formData.privateIps];
    newPrivateIps[index] = value;
    setFormData({ ...formData, privateIps: newPrivateIps });
  };

  const addIpField = () => {
    setFormData({ ...formData, privateIps: [...formData.privateIps, ''] });
  };

  const removeIpField = (index: number) => {
    const newPrivateIps = formData.privateIps.filter((_, i) => i !== index);
    setFormData({ ...formData, privateIps: newPrivateIps });
  };

  const toggleDay = (day: string) => {
    const newDays = formData.allowedDays.includes(day)
      ? formData.allowedDays.filter(d => d !== day)
      : [...formData.allowedDays, day];
    setFormData({ ...formData, allowedDays: newDays });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">접근 제어 관리</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          접근 제어 등록
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리자 ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">공인 IP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">사설 IP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">접속 허용 시간</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">접속 허용 요일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rules.map((rule) => (
              <tr key={rule.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rule.adminId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rule.publicIp}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="flex flex-wrap gap-1">
                    {rule.privateIps.map((ip, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                        {ip}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {rule.allowedTime.start} - {rule.allowedTime.end}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="flex flex-wrap gap-1">
                    {rule.allowedDays.map((day, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs">
                        {day}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    rule.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {rule.isActive ? '활성' : '비활성'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button
                    onClick={() => handleEdit(rule)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(rule.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">
                {editingRule ? '접근 제어 수정' : '접근 제어 등록'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">관리자 ID</label>
                <input
                  type="text"
                  value={formData.adminId}
                  onChange={(e) => setFormData({ ...formData, adminId: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">공인 IP</label>
                <input
                  type="text"
                  value={formData.publicIp}
                  onChange={(e) => setFormData({ ...formData, publicIp: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">사설 IP</label>
                <div className="space-y-2">
                  {formData.privateIps.map((ip, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={ip}
                        onChange={(e) => handleIpChange(index, e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="예: 192.168.1.100"
                      />
                      {index === formData.privateIps.length - 1 ? (
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">시작 시간</label>
                  <input
                    type="time"
                    value={formData.allowedTime.start}
                    onChange={(e) => setFormData({
                      ...formData,
                      allowedTime: { ...formData.allowedTime, start: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">종료 시간</label>
                  <input
                    type="time"
                    value={formData.allowedTime.end}
                    onChange={(e) => setFormData({
                      ...formData,
                      allowedTime: { ...formData.allowedTime, end: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">허용 요일</label>
                <div className="flex flex-wrap gap-2">
                  {DAYS_OF_WEEK.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-3 py-1 rounded-md text-sm ${
                        formData.allowedDays.includes(day)
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                  활성화
                </label>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  {editingRule ? '수정' : '등록'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 