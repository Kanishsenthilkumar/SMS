import { DollarSign, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { Student } from '../../types/student';

interface FeeStatusTabProps {
  feeStatus: Student['feeStatus'];
}

function FeeStatusTab({ feeStatus }: FeeStatusTabProps) {
  const isPaid = feeStatus.status === 'Paid';

  return (
    <div className="space-y-6">
      <div className={`rounded-lg p-8 border-2 ${
        isPaid ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'
      }`}>
        <div className="flex items-center justify-center mb-4">
          {isPaid ? (
            <CheckCircle className="w-20 h-20 text-green-600" />
          ) : (
            <AlertCircle className="w-20 h-20 text-amber-600" />
          )}
        </div>
        <p className="text-center text-2xl font-bold text-gray-900 mb-2">
          Fee Status: {feeStatus.status}
        </p>
        {!isPaid && (
          <p className="text-center text-xl text-amber-700">
            Due Amount: ${feeStatus.dueAmount.toFixed(2)}
          </p>
        )}
        {isPaid && (
          <p className="text-center text-lg text-green-700">
            All fees paid in full
          </p>
        )}
      </div>

      {!isPaid && (
        <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
          <div className="flex items-start space-x-3">
            <div className="bg-amber-500 p-2 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Outstanding Balance</h3>
              <p className="text-3xl text-amber-700 font-bold">${feeStatus.dueAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-[#3b82f6] p-2 rounded-lg">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Payment History</h3>
        </div>

        <div className="space-y-4">
          {feeStatus.paymentHistory.map((payment, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{payment.type}</p>
                    <p className="text-sm text-gray-500">{payment.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">${payment.amount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-300">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-900">Total Paid</p>
            <p className="text-2xl font-bold text-[#3b82f6]">
              ${feeStatus.paymentHistory.reduce((sum, payment) => sum + payment.amount, 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeeStatusTab;
