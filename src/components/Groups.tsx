'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useAppStore from '@/stores/store';
import { Group } from '@/stores/types';
import { ArrowDownRight, Boxes, Users } from 'lucide-react';
import { useEffect } from 'react';
import GroupsDrawer from './GroupsDrawer';
import { Separator } from './ui/separator';
import Link from 'next/link';

const Groups = () => {
  const groups = useAppStore((state) => state.groups);
  const setGroups = useAppStore((state) => state.setGroups);

  // const members = [
  //   { memberId: 'm1', name: 'Alice' },
  //   { memberId: 'm2', name: 'Bob' },
  //   { memberId: 'm3', name: 'Charlie' },
  //   { memberId: 'm4', name: 'David' },
  //   { memberId: 'm5', name: 'Eva' },
  //   // ... other members
  // ];

  useEffect(() => {
    // Fetch initial groups from an API or any other source
    // ... predefined groups
    const initialGroups: Group[] = [
      {
        groupId: '1',
        groupName: 'Friends',
        description: 'Expenses with Friends',
        owedAmount: 1500,
        borrowedAmount: 0,
        isGroup: true,
        createdDate: '2024-01-15',
        membersCount: 5,
        memberIds: ['m1', 'm2', 'm3', 'm4', 'm5'],
        transactions: [
          {
            transactionId: '1',
            description: 'Dinner payment',
            amount: 500,
            date: '2024-01-15',
            type: 'debit',
          },
          {
            transactionId: '2',
            description: 'Paid for movie tickets',
            amount: 300,
            date: '2024-01-16',
            type: 'debit',
          },
        ],
      },
      {
        groupId: '2',
        groupName: 'Family',
        description: 'Expenses with Family',
        owedAmount: 0,
        borrowedAmount: 2000,
        isGroup: true,
        createdDate: '2023-12-25',
        membersCount: 4,
        memberIds: ['m6', 'm7', 'm8', 'm9'],
        transactions: [
          {
            transactionId: '3',
            description: 'Grocery payment',
            amount: 1500,
            date: '2023-12-26',
            type: 'debit',
          },
          {
            transactionId: '4',
            description: 'Paid utility bill',
            amount: 500,
            date: '2023-12-27',
            type: 'debit',
          },
        ],
      },
      {
        groupId: '3',
        groupName: 'Work',
        description: 'Work-related Expenses',
        owedAmount: 500,
        borrowedAmount: 0,
        isGroup: true,
        createdDate: '2024-02-10',
        membersCount: 3,
        memberIds: ['m10', 'm11', 'm12'],
        transactions: [
          {
            transactionId: '5',
            description: 'Bought office supplies',
            amount: 300,
            date: '2024-02-10',
            type: 'debit',
          },
          {
            transactionId: '6',
            description: 'Paid for coffee',
            amount: 200,
            date: '2024-02-11',
            type: 'debit',
          },
        ],
      },
      {
        groupId: '4',
        groupName: 'Travel',
        description: 'Travel and Transportation',
        owedAmount: 0,
        borrowedAmount: 3000,
        isGroup: false,
        createdDate: '2024-01-05',
        membersCount: 2,
        memberIds: ['m13', 'm14'],
        transactions: [
          {
            transactionId: '7',
            description: 'Bought plane tickets',
            amount: 2000,
            date: '2024-01-05',
            type: 'debit',
          },
          {
            transactionId: '8',
            description: 'Paid for hotel',
            amount: 1000,
            date: '2024-01-06',
            type: 'debit',
          },
        ],
      },
      {
        groupId: '5',
        groupName: 'Groceries',
        description: 'Daily Groceries',
        owedAmount: 750,
        borrowedAmount: 0,
        isGroup: false,
        createdDate: '2024-01-20',
        membersCount: 1,
        memberIds: ['m15'],
        transactions: [],
      },
      {
        groupId: '6',
        groupName: 'Dining Out',
        description: 'Meals at Restaurants',
        owedAmount: 1200,
        borrowedAmount: 0,
        isGroup: false,
        createdDate: '2024-01-12',
        membersCount: 3,
        memberIds: ['m16', 'm17', 'm18'],
        transactions: [],
      },
      {
        groupId: '7',
        groupName: 'Entertainment',
        description: 'Movies, Concerts, and Events',
        owedAmount: 0,
        borrowedAmount: 1500,
        isGroup: true,
        createdDate: '2024-01-18',
        membersCount: 6,
        memberIds: ['m19', 'm20', 'm21', 'm22', 'm23', 'm24'],
        transactions: [],
      },
      {
        groupId: '8',
        groupName: 'Health & Fitness',
        description: 'Gym Memberships and Health Expenses',
        owedAmount: 500,
        borrowedAmount: 0,
        isGroup: false,
        createdDate: '2024-01-22',
        membersCount: 1,
        memberIds: ['m25'],
        transactions: [],
      },
      {
        groupId: '9',
        groupName: 'Education',
        description: 'Tuition Fees and Educational Resources',
        owedAmount: 0,
        borrowedAmount: 2500,
        isGroup: true,
        createdDate: '2024-01-25',
        membersCount: 4,
        memberIds: ['m26', 'm27', 'm28', 'm29'],
        transactions: [],
      },
      {
        groupId: '10',
        groupName: 'Shopping',
        description: 'Clothes and Accessories',
        owedAmount: 3000,
        borrowedAmount: 0,
        isGroup: false,
        createdDate: '2024-01-30',
        membersCount: 2,
        memberIds: ['m30', 'm31'],
        transactions: [],
      },
    ];

    setGroups(initialGroups);
  }, [setGroups]);

  return (
    <div className='flex flex-col gap-0 w-full'>
      <div className='flex justify-between items-center px-4 py-2'>
        <div className='text-lg space-x-2'>
          <span className=''>Groups</span>
          <span className='text-sm border p-1 rounded-lg'>{groups.length}</span>
        </div>
        {/* <Button size='sm'>New</Button> */}
        <GroupsDrawer />
      </div>

      <div className='grid grid-cols-1 gap-2 p-2'>
        {groups.map((group, index) => (
          <Link
            href={`/v1/groups/${group.groupId}`}
            key={index}>
            <Card
              // key={index}
              className='border border-gray-200 shadow-none rounded-2xl'>
              <CardHeader className='grid grid-cols-[auto_1fr_auto] gap-2 p-2'>
                <div className='flex justify-center items-center m-2'>
                  <Boxes />
                </div>
                <div className='flex flex-col justify-center space-y-0.5'>
                  <CardTitle className='flex items-center gap-2'>
                    <span>{group.groupName}</span>
                    {group.isGroup && (
                      <Users
                        size={18}
                        className='border border-gray-300 rounded-full p-0.5 mb-0.5'
                      />
                    )}
                  </CardTitle>
                  <CardDescription className='flex items-center space-x-2'>
                    <div className='flex items-center space-x-2'>
                      {group.borrowedAmount > 0 && (
                        <div>Borrowed: ₹{group.borrowedAmount}</div>
                      )}
                      {group.borrowedAmount > 0 && group.owedAmount > 0 && (
                        <Separator
                          orientation='vertical'
                          className='h-4'
                        />
                      )}
                      {group.owedAmount > 0 && (
                        <div>Owed: ₹{group.owedAmount}</div>
                      )}
                    </div>
                  </CardDescription>
                </div>
                <div className='flex justify-center items-center'>
                  <ArrowDownRight color='#c9c9c7' />
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Groups;
