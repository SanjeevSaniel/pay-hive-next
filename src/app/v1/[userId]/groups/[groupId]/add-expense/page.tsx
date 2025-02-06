'use client';

import { useParams, useRouter } from 'next/navigation';
import useBasePath from '@/hooks/useBasePath';
import useGroupMembers from '@/hooks/useGroupMembers';
import useAppStore from '@/stores/useAppStore';
import { Form, Input, Select, SelectItem, Button, Switch } from '@heroui/react';
import { ChevronLeft } from 'lucide-react';
import axios from 'axios';
import { ExpenseCategory, TransactionType, SplitMethod } from '@/types/types';
import { useState } from 'react';
import { FaUser, FaUserFriends } from 'react-icons/fa';

const AddExpenseForm = () => {
  const { groupId } = useParams();
  const resolvedGroupId = Array.isArray(groupId) ? groupId[0] : groupId; // Ensure groupId is a string
  const router = useRouter();
  const basePath = useBasePath();
  const members = useGroupMembers(resolvedGroupId);
  const addFinancialRecord = useAppStore((state) => state.addFinancialRecord);
  const deleteFinancialRecord = useAppStore(
    (state) => state.deleteFinancialRecord,
  );
  const [isMultiple, setIsMultiple] = useState(false);

  const toggleSelectionMode = () => {
    setIsMultiple(!isMultiple);

    // Reset payees value in the form
    const formElement = document.querySelector('form') as HTMLFormElement;
    if (formElement) {
      const payeesField = formElement.elements.namedItem(
        'payees',
      ) as HTMLSelectElement;
      if (payeesField) {
        payeesField.selectedIndex = -1;
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const expenseData = {
      description: formData.get('description') as string,
      amount: parseFloat(formData.get('amount') as string), // Ensure amount is a number
      date: new Date(formData.get('date') as string), // Convert date string to Date object
      category: formData.get('category') as ExpenseCategory, // Cast category to ExpenseCategory
      payees: formData.getAll('payees') as string[], // Handle multiple payees
      groupId: resolvedGroupId,
      type: formData.get('type') as TransactionType, // Cast type to TransactionType
    };

    console.log('Expense Form Data:', expenseData);

    // Generate a temporary ID for the new financial record
    const tempId = `temp-${Date.now()}`;
    const createdAt = new Date();
    const updatedAt = createdAt;

    const tempRecord = {
      ...expenseData,
      recordId: tempId,
      createdAt,
      updatedAt,
    };

    // Add the temporary financial record to the Zustand store
    addFinancialRecord(tempRecord);

    try {
      const response = await axios.post('/api/financial-records', expenseData);
      console.log('Expense saved:', response.data);
      // Update the temporary record with the actual record ID from the response
      deleteFinancialRecord(tempId);
      addFinancialRecord(response.data);
      router.push(`${basePath}/groups/${resolvedGroupId}`);
    } catch (error) {
      console.error('Failed to save expense:', error);
      // Remove the temporary financial record from the Zustand store if an error occurs
      deleteFinancialRecord(tempId);
    }
  };

  const handleNavigationBack = () => {
    router.push(`${basePath}/groups/${resolvedGroupId}`);
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

          {/* Payee */}
          <div className='flex items-center'>
            <Switch
              defaultSelected={isMultiple}
              size='lg'
              color='secondary'
              className='rotate-90'
              isSelected={isMultiple}
              onValueChange={toggleSelectionMode}
              thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                  <FaUserFriends className={`${className} -rotate-90`} />
                ) : (
                  <FaUser className={`${className} -rotate-90`} />
                )
              }
            />

            <Select
              isRequired
              selectionMode={isMultiple ? 'multiple' : 'single'}
              label={isMultiple ? 'Payees' : 'Payer ID'}
              labelPlacement='inside'
              name='payees' // Ensure the name attribute is 'payees'
              placeholder={`Select ${isMultiple ? 'payees' : 'payer'}`}>
              {members.map((member) => (
                <SelectItem
                  key={member.userId}
                  value={member.userId}>
                  {member.name}
                </SelectItem>
              ))}
            </Select>
          </div>

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
            name='type'
            placeholder='Select Type'>
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
