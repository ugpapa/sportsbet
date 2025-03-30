"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Users, DollarSign, Calendar, Activity,
  RefreshCw, Coins, Trophy, Wallet, CreditCard, TrendingUp, Bell
} from 'lucide-react';

// 샘플 데이터
const userStats = [
  { name: '1월', 신규가입자: 120, 활성사용자: 320, 이탈사용자: 20 },
  { name: '2월', 신규가입자: 150, 활성사용자: 380, 이탈사용자: 25 },
  { name: '3월', 신규가입자: 180, 활성사용자: 450, 이탈사용자: 30 },
  { name: '4월', 신규가입자: 250, 활성사용자: 520, 이탈사용자: 35 },
];

const bettingStats = [
  { name: '축구', 배팅수: 450, 배팅금액: 4500000 },
  { name: '농구', 배팅수: 320, 배팅금액: 3200000 },
  { name: '야구', 배팅수: 280, 배팅금액: 2800000 },
  { name: '테니스', 배팅수: 150, 배팅금액: 1500000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const timeRanges = [
  { label: '오늘', value: 'today' },
  { label: '어제', value: 'yesterday' },
  { label: '1주일', value: 'week' },
  { label: '1개월', value: 'month' }
];

// 스포츠별 색상 정의
const sportsColors = {
  축구: '#3B82F6',
  야구: '#10B981',
  농구: '#F59E0B',
  배구: '#6366F1',
  기타: '#8B5CF6'
};

// 전체 데이터 (실제로는 API에서 받아올 데이터)
const fullTimeSeriesData = [
  // 오늘 데이터
  { 
    date: '2024-03-07 09:00', 
    members: 1234, 
    betting: 1567890, 
    profit: 156789, 
    deposit: 2567890, 
    withdraw: 1234567,
    sports: {
      축구: 800000,
      야구: 400000,
      농구: 200000,
      배구: 100000,
      기타: 67890
    },
    memberBetting: [
      { id: 'user123', nickname: '행운의도박꾼', winAmount: 5000000, totalBetting: 15000000 },
      { id: 'user456', nickname: '대박나자', winAmount: 4000000, totalBetting: 12000000 },
      { id: 'user789', nickname: '럭키가이', winAmount: 3000000, totalBetting: 10000000 }
    ]
  },
  { 
    date: '2024-03-07 12:00', 
    members: 1245, 
    betting: 2567890, 
    profit: 256789, 
    deposit: 3567890, 
    withdraw: 1334567,
    sports: {
      축구: 1200000,
      야구: 700000,
      농구: 400000,
      배구: 200000,
      기타: 67890
    },
    memberBetting: [
      { id: 'user234', nickname: '승리의여신', winAmount: 4500000, totalBetting: 14000000 },
      { id: 'user567', nickname: '베팅의신', winAmount: 3500000, totalBetting: 11000000 },
      { id: 'user890', nickname: '돈벼락', winAmount: 2500000, totalBetting: 9000000 }
    ]
  },
  { 
    date: '2024-03-07 15:00', 
    members: 1256, 
    betting: 3567890, 
    profit: 356789, 
    deposit: 4567890, 
    withdraw: 1434567,
    sports: {
      축구: 1800000,
      야구: 1000000,
      농구: 500000,
      배구: 200000,
      기타: 67890
    },
    memberBetting: [
      { id: 'user345', nickname: '대박임박', winAmount: 3000000, totalBetting: 12000000 },
      { id: 'user678', nickname: '럭키스타', winAmount: 2000000, totalBetting: 8000000 },
      { id: 'user901', nickname: '승리자', winAmount: 1500000, totalBetting: 6000000 }
    ]
  },
  { 
    date: '2024-03-07 18:00', 
    members: 1267, 
    betting: 4567890, 
    profit: 456789, 
    deposit: 5567890, 
    withdraw: 1534567,
    sports: {
      축구: 2500000,
      야구: 1200000,
      농구: 500000,
      배구: 300000,
      기타: 67890
    },
    memberBetting: [
      { id: 'user432', nickname: '베팅왕', winAmount: 4000000, totalBetting: 18000000 }
    ]
  },
  
  // 어제 데이터
  { 
    date: '2024-03-06 09:00', 
    members: 1200, 
    betting: 1400000, 
    profit: 140000, 
    deposit: 2400000, 
    withdraw: 1200000,
    sports: {
      축구: 600000,
      야구: 400000,
      농구: 200000,
      배구: 150000,
      기타: 50000
    },
    memberBetting: [
      { id: 'user123', nickname: '행운의도박꾼', winAmount: 5000000, totalBetting: 15000000 },
      { id: 'user456', nickname: '대박나자', winAmount: 4000000, totalBetting: 12000000 },
      { id: 'user789', nickname: '럭키가이', winAmount: 3000000, totalBetting: 10000000 }
    ]
  },
  { 
    date: '2024-03-06 12:00', 
    members: 1210, 
    betting: 2400000, 
    profit: 240000, 
    deposit: 3400000, 
    withdraw: 1300000,
    sports: {
      축구: 1000000,
      야구: 800000,
      농구: 400000,
      배구: 150000,
      기타: 50000
    },
    memberBetting: [
      { id: 'user234', nickname: '승리의여신', winAmount: 4500000, totalBetting: 14000000 },
      { id: 'user567', nickname: '베팅의신', winAmount: 3500000, totalBetting: 11000000 },
      { id: 'user890', nickname: '돈벼락', winAmount: 2500000, totalBetting: 9000000 }
    ]
  },
  { 
    date: '2024-03-06 15:00', 
    members: 1220, 
    betting: 3400000, 
    profit: 340000, 
    deposit: 4400000, 
    withdraw: 1400000,
    sports: {
      축구: 1500000,
      야구: 1000000,
      농구: 600000,
      배구: 250000,
      기타: 50000
    },
    memberBetting: [
      { id: 'user345', nickname: '대박임박', winAmount: 3000000, totalBetting: 12000000 },
      { id: 'user678', nickname: '럭키스타', winAmount: 2000000, totalBetting: 8000000 },
      { id: 'user901', nickname: '승리자', winAmount: 1500000, totalBetting: 6000000 }
    ]
  },
  { 
    date: '2024-03-06 18:00', 
    members: 1230, 
    betting: 4400000, 
    profit: 440000, 
    deposit: 5400000, 
    withdraw: 1500000,
    sports: {
      축구: 2000000,
      야구: 1200000,
      농구: 800000,
      배구: 350000,
      기타: 50000
    },
    memberBetting: [
      { id: 'user432', nickname: '베팅왕', winAmount: 4000000, totalBetting: 18000000 }
    ]
  },
  
  // 일주일 데이터
  { date: '2024-03-05', members: 1150, betting: 4200000, profit: 420000, deposit: 5200000, withdraw: 1450000 },
  { date: '2024-03-04', members: 1100, betting: 4000000, profit: 400000, deposit: 5000000, withdraw: 1400000 },
  { date: '2024-03-03', members: 1050, betting: 3800000, profit: 380000, deposit: 4800000, withdraw: 1350000 },
  { date: '2024-03-02', members: 1000, betting: 3600000, profit: 360000, deposit: 4600000, withdraw: 1300000 },
  { date: '2024-03-01', members: 950, betting: 3400000, profit: 340000, deposit: 4400000, withdraw: 1250000 },
  
  // 한달 데이터
  { date: '2024-02-28', members: 900, betting: 3200000, profit: 320000, deposit: 4200000, withdraw: 1200000 },
  { date: '2024-02-21', members: 850, betting: 3000000, profit: 300000, deposit: 4000000, withdraw: 1150000 },
  { date: '2024-02-14', members: 800, betting: 2800000, profit: 280000, deposit: 3800000, withdraw: 1100000 },
  { date: '2024-02-07', members: 750, betting: 2600000, profit: 260000, deposit: 3600000, withdraw: 1050000 },
];

// 샘플 알림 데이터
const notifications = [
  { id: 1, type: 'event', message: '새로운 회원이 가입했습니다.', time: '1분 전' },
  { id: 2, type: 'warning', message: '대량의 입금 요청이 발생했습니다.', time: '5분 전' },
  { id: 3, type: 'alert', message: '비정상적인 배팅 패턴이 감지되었습니다.', time: '10분 전' }
];

export default function DashboardPage() {
  const [selectedRange, setSelectedRange] = useState('today');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 선택된 날짜 구간에 따라 데이터 필터링
  const filteredData = useMemo(() => {
    if (!mounted) return [];

    const baseDate = '2024-03-07';
    
    switch (selectedRange) {
      case 'today':
        return fullTimeSeriesData.filter(item => 
          item.date.startsWith(baseDate)
        );
      case 'yesterday':
        return fullTimeSeriesData.filter(item => 
          item.date.startsWith('2024-03-06')
        );
      case 'week':
        return fullTimeSeriesData.filter(item => {
          const itemDate = new Date(item.date);
          const weekAgo = new Date(baseDate);
          weekAgo.setDate(weekAgo.getDate() - 7);
          return itemDate >= weekAgo;
        });
      case 'month':
        return fullTimeSeriesData.filter(item => {
          const itemDate = new Date(item.date);
          const monthAgo = new Date(baseDate);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          return itemDate >= monthAgo;
        });
      default:
        return fullTimeSeriesData.filter(item => 
          item.date.startsWith(baseDate)
        );
    }
  }, [selectedRange, mounted]);

  // 선택된 구간의 요약 데이터 계산
  const summaryData = useMemo(() => {
    if (!mounted || !filteredData.length) return {
      totalMembers: 0,
      totalBetting: 0,
      maxWin: 0,
      totalDeposit: 0,
      totalWithdraw: 0,
      platformProfit: 0
    };

    return {
      totalMembers: filteredData[filteredData.length - 1].members,
      totalBetting: filteredData.reduce((sum, item) => sum + item.betting, 0),
      maxWin: Math.max(...filteredData.map(item => item.profit)),
      totalDeposit: filteredData.reduce((sum, item) => sum + item.deposit, 0),
      totalWithdraw: filteredData.reduce((sum, item) => sum + item.withdraw, 0),
      platformProfit: filteredData.reduce((sum, item) => sum + item.profit, 0)
    };
  }, [filteredData, mounted]);

  // 선택된 구간의 스포츠별 베팅 데이터 계산
  const sportsBettingData = useMemo(() => {
    if (!mounted || !filteredData.length) return [];

    // 각 스포츠별 총 베팅금액 계산
    const totalsBySport = filteredData.reduce((acc, item) => {
      if (item.sports) {
        Object.entries(item.sports).forEach(([sport, amount]) => {
          acc[sport] = (acc[sport] || 0) + Number(amount);
        });
      }
      return acc;
    }, {});

    // 파이 차트용 데이터 형식으로 변환
    return Object.entries(totalsBySport).map(([name, value]) => ({
      name,
      value,
      color: sportsColors[name]
    }));
  }, [filteredData, mounted]);

  // 선택된 구간의 회원 베팅 데이터 계산
  const memberBettingStats = useMemo(() => {
    if (!mounted || !filteredData.length) return {
      topWinners: [],
      topBettors: []
    };

    // 모든 회원 베팅 데이터 수집
    const allMemberBetting = filteredData.reduce((acc, item) => {
      if (item.memberBetting) {
        item.memberBetting.forEach(member => {
          const existingMember = acc[member.id] || { 
            id: member.id, 
            nickname: member.nickname,
            winAmount: 0,
            totalBetting: 0
          };
          
          existingMember.winAmount += member.winAmount;
          existingMember.totalBetting += member.totalBetting;
          acc[member.id] = existingMember;
        });
      }
      return acc;
    }, {});

    // 객체를 배열로 변환
    const memberArray = Object.values(allMemberBetting);

    // 당첨금과 베팅금 기준으로 정렬
    const topWinners = [...memberArray]
      .sort((a, b) => b.winAmount - a.winAmount)
      .slice(0, 10);

    const topBettors = [...memberArray]
      .sort((a, b) => b.totalBetting - a.totalBetting)
      .slice(0, 10);

    return { topWinners, topBettors };
  }, [filteredData, mounted]);

  if (!mounted) {
    return null; // 또는 로딩 상태를 표시
  }

  return (
    <div className="space-y-6">
      {/* 날짜 구간 선택 */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold">날짜 구간</h2>
          <div className="flex space-x-2">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setSelectedRange(range.value)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedRange === range.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 요약 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">가입 회원 수</p>
              <h3 className="text-2xl font-bold">{summaryData.totalMembers.toLocaleString()}명</h3>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">배팅 금액</p>
              <h3 className="text-2xl font-bold">{summaryData.totalBetting.toLocaleString()}원</h3>
            </div>
            <Coins className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">최고 배팅 당첨금</p>
              <h3 className="text-2xl font-bold">{summaryData.maxWin.toLocaleString()}원</h3>
            </div>
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">충전금액</p>
              <h3 className="text-2xl font-bold">{summaryData.totalDeposit.toLocaleString()}원</h3>
            </div>
            <Wallet className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">인출금액</p>
              <h3 className="text-2xl font-bold">{summaryData.totalWithdraw.toLocaleString()}원</h3>
            </div>
            <CreditCard className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">플랫폼 이익</p>
              <h3 className="text-2xl font-bold">{summaryData.platformProfit.toLocaleString()}원</h3>
            </div>
            <TrendingUp className="w-8 h-8 text-indigo-500" />
          </div>
        </div>
      </div>

      {/* 상세 통계 정보 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 최고 당첨금 회원 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">최고 당첨금 회원 TOP 10</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">순위</th>
                  <th className="text-left py-2">아이디</th>
                  <th className="text-left py-2">닉네임</th>
                  <th className="text-right py-2">당첨금</th>
                </tr>
              </thead>
              <tbody>
                {memberBettingStats.topWinners.map((member, index) => (
                  <tr key={member.id} className="border-b">
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">{member.id}</td>
                    <td className="py-2">{member.nickname}</td>
                    <td className="text-right py-2">{member.winAmount.toLocaleString()}원</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 최고 베팅금 회원 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">최고 베팅금 회원 TOP 10</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">순위</th>
                  <th className="text-left py-2">아이디</th>
                  <th className="text-left py-2">닉네임</th>
                  <th className="text-right py-2">베팅금</th>
                </tr>
              </thead>
              <tbody>
                {memberBettingStats.topBettors.map((member, index) => (
                  <tr key={member.id} className="border-b">
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">{member.id}</td>
                    <td className="py-2">{member.nickname}</td>
                    <td className="text-right py-2">{member.totalBetting.toLocaleString()}원</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 스포츠별 베팅 통계 */}
        <div className="bg-white p-6 rounded-lg shadow col-span-2">
          <h2 className="text-lg font-semibold mb-4">스포츠별 베팅 통계</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">가장 많이 배팅한 종목</p>
                <p className="text-xl font-bold text-blue-600">
                  {sportsBettingData.length > 0 ? 
                    `${sportsBettingData.reduce((max, curr) => max.value > curr.value ? max : curr).name} - ${sportsBettingData.reduce((max, curr) => max.value > curr.value ? max : curr).value.toLocaleString()}원` 
                    : '데이터 없음'}
                </p>
              </div>
              <Trophy className="w-8 h-8 text-blue-500" />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">가장 적게 배팅한 종목</p>
                <p className="text-xl font-bold text-gray-600">
                  {sportsBettingData.length > 0 ? 
                    `${sportsBettingData.reduce((min, curr) => min.value < curr.value ? min : curr).name} - ${sportsBettingData.reduce((min, curr) => min.value < curr.value ? min : curr).value.toLocaleString()}원`
                    : '데이터 없음'}
                </p>
              </div>
              <Activity className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* 통계 그래프 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">회원 및 배팅 추이</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="members"
                  stroke="#3B82F6"
                  name="회원 수"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="betting"
                  stroke="#10B981"
                  name="배팅 금액"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">플랫폼 이익 추이</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="profit" fill="#6366F1" name="플랫폼 이익" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">스포츠별 베팅 현황</h2>
          <div className="h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sportsBettingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sportsBettingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${Number(value).toLocaleString()}원`} />
                <Legend
                  verticalAlign="middle"
                  align="right"
                  layout="vertical"
                  formatter={(value) => `${value} (${((sportsBettingData.find(item => item.name === value)?.value || 0) / sportsBettingData.reduce((sum, item) => sum + item.value, 0) * 100).toFixed(1)}%)`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 실시간 알림 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center space-x-2 mb-4">
          <Bell className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">실시간 알림</h2>
        </div>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    notification.type === 'event'
                      ? 'bg-green-500'
                      : notification.type === 'warning'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                />
                <span className="text-gray-700">{notification.message}</span>
              </div>
              <span className="text-sm text-gray-500">{notification.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 