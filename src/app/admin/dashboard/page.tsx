"use client";
import React, { useState } from 'react';
import {
  Users,
  TrendingUp,
  Activity,
  ArrowDownToLine
} from 'lucide-react';

export default function DashboardPage() {
  const [stats] = useState({
    totalUsers: 1234,
    activeUsers: 789,
    totalRevenue: 45678900,
    totalBets: 5678,
    totalDeposits: 23456700,
    totalWithdrawals: 12345600,
    totalProfit: 11111100,
    totalLoss: 22222200,
    totalCommission: 33333300,
    totalBonus: 44444400,
    totalPromotions: 55555500,
    totalSupport: 66666600,
    totalHelp: 77777700
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">대시보드</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">전체 회원</p>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">활성 회원</p>
              <p className="text-2xl font-bold">{stats.activeUsers}</p>
            </div>
            <Activity className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">전체 베팅</p>
              <p className="text-2xl font-bold">{stats.totalBets}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">전체 수익</p>
              <p className="text-2xl font-bold">₩{stats.totalRevenue.toLocaleString()}</p>
            </div>
            <ArrowDownToLine className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>
    </div>
  );
} 