import { FinancialRecord } from '@/types/types';

interface FinancialRecordsListProps {
  records: FinancialRecord[];
}

const GroupTransactions = ({ records }: FinancialRecordsListProps) => {
  return (
    <div className='p-2'>
      <h2 className='text-2xl font-bold'>Expenses and Financial Records</h2>
      <ul className='list-disc list-inside'>
        {records.map((record) => (
          <li key={record.recordId}>
            {record.description} - ₹{record.amount} -{' '}
            {new Date(record.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupTransactions;
