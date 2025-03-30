import React from 'react';

interface Role {
  name: string;
  permissions: string[];
}

interface PermissionsProps {
  roles: Role[];
  onSettingChange: (roles: Role[]) => void;
}

export default function Permissions({ roles, onSettingChange }: PermissionsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">권한 설정</h2>
      
      <div className="space-y-4">
        {roles.map((role, index) => (
          <div key={role.name} className="border rounded-md p-4">
            <h3 className="text-md font-medium text-gray-900 mb-2">{role.name}</h3>
            <div className="space-y-2">
              {['read', 'write', 'delete', 'all'].map((permission) => (
                <div key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${role.name}-${permission}`}
                    checked={role.permissions.includes(permission)}
                    onChange={(e) => {
                      const newRoles = [...roles];
                      if (e.target.checked) {
                        newRoles[index].permissions = [...new Set([...newRoles[index].permissions, permission])];
                      } else {
                        newRoles[index].permissions = newRoles[index].permissions.filter(p => p !== permission);
                      }
                      onSettingChange(newRoles);
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`${role.name}-${permission}`} className="ml-2 block text-sm text-gray-700">
                    {permission === 'read' ? '읽기' :
                     permission === 'write' ? '쓰기' :
                     permission === 'delete' ? '삭제' :
                     permission === 'all' ? '모든 권한' : permission}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 