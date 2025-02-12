import GroupActivities from '@/components/groups/GroupActivities';
import GroupSummary from '@/components/groups/GroupSummary';
import GroupTransactions from '@/components/groups/GroupTransactions';
import { FinancialRecord, Group } from '@/types/types';
import { Tab, Tabs } from '@heroui/tabs';
import { Card, CardBody } from '@heroui/card';
import { Key, useMemo, useState, useCallback } from 'react';
import { FiActivity, FiBarChart2, FiFileText } from 'react-icons/fi';

interface GroupTabsProps {
  group: Group | null;
  groupRecords: FinancialRecord[];
}

const GroupTabs: React.FC<GroupTabsProps> = ({ group, groupRecords }) => {
  const [selected, setSelected] = useState('transactions');

  const handleSelectionChange = useCallback((key: Key) => {
    setSelected(key.toString()); // Ensure the key is converted to a string
  }, []);

  const tabs = useMemo(
    () => [
      {
        id: 'transactions',
        label: 'Transactions',
        content: group ? (
          <GroupTransactions records={groupRecords} />
        ) : (
          <div>Loading...</div>
        ),
        icon: <FiFileText />,
      },
      {
        id: 'activities',
        label: 'Activities',
        content: <GroupActivities />,
        icon: <FiActivity />,
      },
      {
        id: 'summary',
        label: 'Summary',
        content: <GroupSummary />,
        icon: <FiBarChart2 />,
      },
    ],
    [group, groupRecords],
  );

  return (
    <Tabs
      aria-label='Group Information tabs'
      items={tabs}
      selectedKey={selected}
      onSelectionChange={handleSelectionChange}
      size='md'
      className='flex justify-evenly mb-0 flex-wrap'>
      {(item) => (
        <Tab
          key={item.id}
          title={
            <div className='flex items-center space-x-1'>
              {item.icon}
              <span className='text-md'>{item.label}</span>
            </div>
          }
          className='w-full py-0'>
          <Card className='bg-transparent shadow-none'>
            <CardBody className='p-0'>{item.content}</CardBody>
          </Card>
        </Tab>
      )}
    </Tabs>
  );
};

export default GroupTabs;
