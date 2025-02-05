'use client';

import axios from 'axios';
import useBasePath from '@/hooks/useBasePath';
import { ExpenseCategory, SplitMethod, TransactionType } from '@/types/types';
import { Button, Form, Input, Select, SelectItem } from '@heroui/react';
import { ChevronLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

const AddExpenseForm = () => {
  const { groupId } = useParams();
  const router = useRouter();
  const basePath = useBasePath();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const expenseData = {
      description: formData.get('description'),
      amount: formData.get('amount'),
      date: formData.get('date'),
      category: formData.get('category'),
      payerId: formData.get('payerId'),
      groupId: groupId,
      // splitMethod: formData.get('splitMethod'),
      // splitDetails: formData.get('splitDetails'),
      type: formData.get('type'),
    };

    console.log('Expense Form Data:', expenseData);

    try {
      const response = await axios.post('/api/financial-records', expenseData);
      console.log('Expense saved:', response.data);
      router.push(`${basePath}/groups/${groupId}`);
    } catch (error) {
      console.error('Failed to save expense:', error);
    }
  };

  const handleNavigationBack = () => {
    router.push(`${basePath}/groups/${groupId}`);
  };

  return (
    <div className='grid grid-cols-1 gap-4 p-1 my-2'>
      <div className='grid grid-cols-3 gap-4'>
        <div className='flex items-center justify-start'>
          <Button
            isIconOnly
            size='md'
            variant='flat'
            className='rounded-xl'
            onPress={handleNavigationBack}>
            <ChevronLeft />
          </Button>
        </div>
      </div>

      <div className='flex justify-center items-center'>
        <h1 className='p-2 text-2xl font-bold'>Add Expense</h1>
      </div>

      <Form
        className='w-full'
        validationBehavior='native'
        onSubmit={onSubmit}>
        <div className='grid grid-cols-1 gap-2 w-full'>
          <Input
            isRequired
            label='Description'
            labelPlacement='inside'
            name='description'
            placeholder='Enter description'
            type='text'
            validate={(value) => {
              if (value.length < 3) {
                return 'Description must be at least 3 characters long';
              }
              return null;
            }}
          />
          <Input
            isRequired
            label='Amount'
            labelPlacement='inside'
            name='amount'
            placeholder='Enter amount'
            type='number'
            validate={(value) => {
              if (Number(value) <= 0) {
                return 'Amount must be greater than 0';
              }
              return null;
            }}
          />

          <Input
            isRequired
            label='Date'
            labelPlacement='inside'
            name='date'
            type='date'
          />

          <Input
            isRequired
            label='Payer ID'
            labelPlacement='inside'
            name='payerId'
            placeholder='Enter payer ID'
            type='text'
          />

          <Select
            isRequired
            label='Category'
            labelPlacement='inside'
            name='category'
            placeholder='Select category'>
            {Object.values(ExpenseCategory).map((category) => (
              <SelectItem
                key={category}
                value={category}>
                {category}
              </SelectItem>
            ))}
          </Select>
          <Select
            isRequired
            label='Transaction Type'
            labelPlacement='inside'
            name='type'>
            {Object.values(TransactionType).map((type) => (
              <SelectItem
                key={type}
                value={type}>
                {type}
              </SelectItem>
            ))}
          </Select>

          <Select
            label='Split Method'
            labelPlacement='inside'
            name='splitMethod'>
            {Object.values(SplitMethod).map((method) => (
              <SelectItem
                key={method}
                value={method}>
                {method}
              </SelectItem>
            ))}
          </Select>

          <Input
            label='Split Details'
            labelPlacement='inside'
            name='splitDetails'
            placeholder='Enter split details'
            type='text'
          />
        </div>
        <div className='w-full grid grid-cols-2'>
          <Button
            color='danger'
            variant='light'
            onPress={() => router.back()}>
            Cancel
          </Button>
          <Button
            type='submit'
            color='primary'>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddExpenseForm;
