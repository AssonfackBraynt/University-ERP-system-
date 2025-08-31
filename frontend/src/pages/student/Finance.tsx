import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
// Select, Tabs, Alert, and Label components not available - using simple state management instead
import { Progress } from '../../components/ui/Progress';
import { DashboardLayout } from '../../components/layout';

interface FeeItem {
  id: string;
  category: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Partial';
  paidAmount?: number;
  penalty?: number;
}

interface PaymentHistory {
  id: string;
  date: string;
  description: string;
  amount: number;
  method: 'Credit Card' | 'Bank Transfer' | 'Cash' | 'Check' | 'Online';
  transactionId: string;
  status: 'Completed' | 'Pending' | 'Failed';
  receiptUrl?: string;
}

interface InstallmentPlan {
  id: string;
  totalAmount: number;
  installments: {
    number: number;
    amount: number;
    dueDate: string;
    status: 'Paid' | 'Pending' | 'Overdue';
    paidDate?: string;
  }[];
}

const mockFees: FeeItem[] = [
  {
    id: '1',
    category: 'Tuition',
    description: 'Spring 2024 Tuition Fee',
    amount: 15000,
    dueDate: '2024-02-15',
    status: 'Paid',
    paidAmount: 15000
  },
  {
    id: '2',
    category: 'Laboratory',
    description: 'Computer Science Lab Fee',
    amount: 500,
    dueDate: '2024-01-30',
    status: 'Pending'
  },
  {
    id: '3',
    category: 'Library',
    description: 'Library Access Fee',
    amount: 200,
    dueDate: '2024-01-25',
    status: 'Overdue',
    penalty: 25
  },
  {
    id: '4',
    category: 'Sports',
    description: 'Athletic Facility Fee',
    amount: 300,
    dueDate: '2024-02-01',
    status: 'Partial',
    paidAmount: 150
  },
  {
    id: '5',
    category: 'Technology',
    description: 'IT Services Fee',
    amount: 400,
    dueDate: '2024-02-10',
    status: 'Pending'
  },
  {
    id: '6',
    category: 'Student Services',
    description: 'Student Activity Fee',
    amount: 250,
    dueDate: '2024-01-20',
    status: 'Paid',
    paidAmount: 250
  }
];

const mockPaymentHistory: PaymentHistory[] = [
  {
    id: '1',
    date: '2024-01-15',
    description: 'Spring 2024 Tuition Fee',
    amount: 15000,
    method: 'Bank Transfer',
    transactionId: 'TXN-2024-001',
    status: 'Completed',
    receiptUrl: '/receipts/txn-2024-001.pdf'
  },
  {
    id: '2',
    date: '2024-01-10',
    description: 'Student Activity Fee',
    amount: 250,
    method: 'Credit Card',
    transactionId: 'TXN-2024-002',
    status: 'Completed',
    receiptUrl: '/receipts/txn-2024-002.pdf'
  },
  {
    id: '3',
    date: '2024-01-08',
    description: 'Athletic Facility Fee (Partial)',
    amount: 150,
    method: 'Online',
    transactionId: 'TXN-2024-003',
    status: 'Completed',
    receiptUrl: '/receipts/txn-2024-003.pdf'
  },
  {
    id: '4',
    date: '2023-12-20',
    description: 'Fall 2023 Late Fee',
    amount: 50,
    method: 'Credit Card',
    transactionId: 'TXN-2023-045',
    status: 'Completed',
    receiptUrl: '/receipts/txn-2023-045.pdf'
  }
];

const mockInstallmentPlan: InstallmentPlan = {
  id: '1',
  totalAmount: 15000,
  installments: [
    {
      number: 1,
      amount: 5000,
      dueDate: '2024-01-15',
      status: 'Paid',
      paidDate: '2024-01-15'
    },
    {
      number: 2,
      amount: 5000,
      dueDate: '2024-02-15',
      status: 'Paid',
      paidDate: '2024-02-14'
    },
    {
      number: 3,
      amount: 5000,
      dueDate: '2024-03-15',
      status: 'Pending'
    }
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Paid': return 'bg-green-100 text-green-800';
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    case 'Overdue': return 'bg-red-100 text-red-800';
    case 'Partial': return 'bg-blue-100 text-blue-800';
    case 'Completed': return 'bg-green-100 text-green-800';
    case 'Failed': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getPaymentMethodIcon = (method: string) => {
  switch (method) {
    case 'Credit Card':
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    case 'Bank Transfer':
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      );
    case 'Online':
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    default:
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
  }
};

const Finance: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSemester, setSelectedSemester] = useState('Spring 2024');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [selectedFeeId, setSelectedFeeId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const totalFees = mockFees.reduce((sum, fee) => sum + fee.amount + (fee.penalty || 0), 0);
  const totalPaid = mockFees.reduce((sum, fee) => sum + (fee.paidAmount || 0), 0);
  const outstandingBalance = totalFees - totalPaid;
  const overdueAmount = mockFees
    .filter(fee => fee.status === 'Overdue')
    .reduce((sum, fee) => sum + fee.amount + (fee.penalty || 0) - (fee.paidAmount || 0), 0);

  const pendingFees = mockFees.filter(fee => fee.status === 'Pending' || fee.status === 'Overdue' || fee.status === 'Partial');
  const paidFees = mockFees.filter(fee => fee.status === 'Paid');

  const PaymentModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedFee = mockFees.find(fee => fee.id === selectedFeeId);

    if (!isOpen) {
      return (
        <Button 
          onClick={() => setIsOpen(true)} 
          className="bg-blue-600 hover:bg-blue-700"
          disabled={!selectedFeeId}
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Pay Now
        </Button>
      );
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Make Payment</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedFee && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold">{selectedFee.description}</h4>
                <p className="text-sm text-gray-600">Amount Due: ${selectedFee.amount - (selectedFee.paidAmount || 0)}</p>
                {selectedFee.penalty && (
                  <p className="text-sm text-red-600">Penalty: ${selectedFee.penalty}</p>
                )}
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Payment Amount</label>
              <input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Payment Method</label>
              <select 
                value={paymentMethod} 
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="credit-card">Credit Card</option>
                <option value="debit-card">Debit Card</option>
                <option value="bank-transfer">Bank Transfer</option>
                <option value="online-banking">Online Banking</option>
              </select>
            </div>
            
            {paymentMethod === 'credit-card' && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Card Number</label>
                  <input id="card-number" placeholder="1234 5678 9012 3456" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <input id="expiry" placeholder="MM/YY" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div className="space-y-2">
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                  <input id="cvv" placeholder="123" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="cardholder" className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                <input id="cardholder" placeholder="John Doe" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
              </div>
            )}
            
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => {
                  // Handle payment processing here
                  setIsOpen(false);
                  setPaymentAmount('');
                  setSelectedFeeId('');
                }}
              >
                Process Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <DashboardLayout activeSection="finance">
      <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Finance</h1>
          <p className="text-gray-600 mt-1">Manage your fees and payments</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <select 
            value={selectedSemester} 
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="Spring 2024">Spring 2024</option>
            <option value="Fall 2023">Fall 2023</option>
            <option value="Summer 2023">Summer 2023</option>
          </select>
          
          <Button variant="outline">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Statement
          </Button>
        </div>
      </div>

      {/* Outstanding Balance Alert */}
      {outstandingBalance > 0 && (
        <div className={`mb-6 p-4 border rounded-lg flex items-start gap-3 ${overdueAmount > 0 ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'}`}>
          <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${overdueAmount > 0 ? 'text-red-600' : 'text-yellow-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div className={overdueAmount > 0 ? 'text-red-800' : 'text-yellow-800'}>
            <strong>{overdueAmount > 0 ? 'Overdue Payment Alert:' : 'Payment Reminder:'}</strong> 
            You have an outstanding balance of ${outstandingBalance.toLocaleString()}.
            {overdueAmount > 0 && ` Overdue amount: $${overdueAmount.toLocaleString()}`}
          </div>
        </div>
      )}

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Fees</p>
                <p className="text-2xl font-bold text-gray-900">${totalFees.toLocaleString()}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Amount Paid</p>
                <p className="text-2xl font-bold text-green-600">${totalPaid.toLocaleString()}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Outstanding</p>
                <p className={`text-2xl font-bold ${outstandingBalance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  ${outstandingBalance.toLocaleString()}
                </p>
              </div>
              <div className={`w-8 h-8 ${outstandingBalance > 0 ? 'bg-red-100' : 'bg-green-100'} rounded-full flex items-center justify-center`}>
                <svg className={`w-4 h-4 ${outstandingBalance > 0 ? 'text-red-600' : 'text-green-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">${overdueAmount.toLocaleString()}</p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Navigation */}
      <div className="w-full">
        <div className="grid grid-cols-4 gap-2 mb-6">
          <Button 
            variant={activeTab === 'overview' ? 'primary' : 'outline'} 
            onClick={() => setActiveTab('overview')}
            className="w-full"
          >
            Overview
          </Button>
          <Button 
            variant={activeTab === 'payments' ? 'primary' : 'outline'} 
            onClick={() => setActiveTab('payments')}
            className="w-full"
          >
            Make Payment
          </Button>
          <Button 
            variant={activeTab === 'history' ? 'primary' : 'outline'} 
            onClick={() => setActiveTab('history')}
            className="w-full"
          >
            Payment History
          </Button>
          <Button 
            variant={activeTab === 'installments' ? 'primary' : 'outline'} 
            onClick={() => setActiveTab('installments')}
            className="w-full"
          >
            Installments
          </Button>
        </div>
        
        {activeTab === 'overview' && (
          <div className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Fee Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockFees.map(fee => {
                      const remainingAmount = fee.amount - (fee.paidAmount || 0) + (fee.penalty || 0);
                      return (
                        <div key={fee.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900">{fee.category}</h4>
                              <Badge className={getStatusColor(fee.status)} variant="outline">
                                {fee.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{fee.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>Due: {new Date(fee.dueDate).toLocaleDateString()}</span>
                              {fee.penalty && <span className="text-red-600">Penalty: ${fee.penalty}</span>}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">
                              ${remainingAmount > 0 ? remainingAmount.toLocaleString() : fee.amount.toLocaleString()}
                            </div>
                            {fee.paidAmount && (
                              <div className="text-sm text-green-600">
                                Paid: ${fee.paidAmount.toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {((totalPaid / totalFees) * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600 mb-4">Payment Completion</div>
                      <Progress value={(totalPaid / totalFees) * 100} className="h-3" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{paidFees.length}</div>
                        <div className="text-sm text-green-700">Paid Items</div>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <div className="text-lg font-bold text-yellow-600">{pendingFees.length}</div>
                        <div className="text-sm text-yellow-700">Pending Items</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Pay All Outstanding
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Set Up Installment Plan
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Receipt
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          </div>
        )}
        
        {activeTab === 'payments' && (
          <div className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Fee to Pay</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingFees.map(fee => {
                    const remainingAmount = fee.amount - (fee.paidAmount || 0) + (fee.penalty || 0);
                    return (
                      <div 
                        key={fee.id} 
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedFeeId === fee.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedFeeId(fee.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900">{fee.category}</h4>
                              <Badge className={getStatusColor(fee.status)} variant="outline">
                                {fee.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{fee.description}</p>
                            <p className="text-xs text-gray-500">Due: {new Date(fee.dueDate).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">${remainingAmount.toLocaleString()}</div>
                            {fee.penalty && (
                              <div className="text-sm text-red-600">+${fee.penalty} penalty</div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Portal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedFeeId ? (
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900">Selected Fee</h4>
                      <p className="text-sm text-blue-700">
                        {mockFees.find(fee => fee.id === selectedFeeId)?.description}
                      </p>
                      <p className="text-lg font-bold text-blue-900">
                        Amount: ${(
                          mockFees.find(fee => fee.id === selectedFeeId)?.amount! - 
                          (mockFees.find(fee => fee.id === selectedFeeId)?.paidAmount || 0) +
                          (mockFees.find(fee => fee.id === selectedFeeId)?.penalty || 0)
                        ).toLocaleString()}
                      </p>
                    </div>
                    
                    <PaymentModal />
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <p>Select a fee to make payment</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          </div>
        )}
        
        {activeTab === 'history' && (
          <div className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Payment History</CardTitle>
                <Button variant="outline" size="sm">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockPaymentHistory.map(payment => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        {getPaymentMethodIcon(payment.method)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{payment.description}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{new Date(payment.date).toLocaleDateString()}</span>
                          <span>{payment.method}</span>
                          <span>ID: {payment.transactionId}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">${payment.amount.toLocaleString()}</div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(payment.status)} variant="outline">
                          {payment.status}
                        </Badge>
                        {payment.receiptUrl && (
                          <Button variant="ghost" size="sm">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          </div>
        )}
        
        {activeTab === 'installments' && (
          <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Installment Plan</CardTitle>
              <p className="text-sm text-gray-600">Spring 2024 Tuition Fee - 3 Installments</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-semibold text-blue-900">Total Amount</span>
                  <span className="text-xl font-bold text-blue-900">${mockInstallmentPlan.totalAmount.toLocaleString()}</span>
                </div>
                
                <div className="space-y-3">
                  {mockInstallmentPlan.installments.map(installment => (
                    <div key={installment.number} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          installment.status === 'Paid' ? 'bg-green-100 text-green-800' :
                          installment.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {installment.number}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Installment {installment.number}</h4>
                          <div className="text-sm text-gray-600">
                            Due: {new Date(installment.dueDate).toLocaleDateString()}
                            {installment.paidDate && (
                              <span className="ml-2 text-green-600">
                                • Paid: {new Date(installment.paidDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">${installment.amount.toLocaleString()}</div>
                        <Badge className={getStatusColor(installment.status)} variant="outline">
                          {installment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium">
                      {mockInstallmentPlan.installments.filter(i => i.status === 'Paid').length} of {mockInstallmentPlan.installments.length} paid
                    </span>
                  </div>
                  <Progress 
                    value={(mockInstallmentPlan.installments.filter(i => i.status === 'Paid').length / mockInstallmentPlan.installments.length) * 100} 
                    className="h-2" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        )}
      </div>
      </div>
    </DashboardLayout>
  );
};

export default Finance;