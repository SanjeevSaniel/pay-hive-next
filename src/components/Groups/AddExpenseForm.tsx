'use client';

import useBasePath from '@/hooks/useBasePath';
import useGroupMembers from '@/hooks/useGroupMembers';
import useAppStore from '@/stores/useAppStore';
import { ExpenseCategory, SplitMethod, TransactionType } from '@/types/types';
import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Switch,
  useDisclosure,
} from '@heroui/react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
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

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

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
    } finally {
      onClose();
    }
  };

  // const handleNavigationBack = () => {
  //   router.push(`${basePath}/groups/${resolvedGroupId}`);
  // };

  return (
    <>
      <Button
        size='md'
        variant='solid'
        className='rounded-xl'
        onPress={onOpen}>
        <Plus />
        Add Expense
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}>
        <ModalContent className='dark text-white rounded-b-none'>
          {() => (
            <>
              <ModalHeader className='flex gap-1 justify-center w-full'>
                Add Group Expense
              </ModalHeader>
              <ModalBody>
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
                            <FaUserFriends
                              className={`${className} -rotate-90`}
                            />
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
                        placeholder={`Select ${
                          isMultiple ? 'payees' : 'payer'
                        }`}>
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

                  <ModalFooter className='w-full flex justify-around'>
                    {/* <Button
                      color='danger'
                      variant='light'
                      onPress={onClose}>
                      Cancel
                    </Button> */}
                    <Button
                      type='submit'
                      color='primary'
                      variant='solid'
                      className='w-full'>
                      Save
                    </Button>
                  </ModalFooter>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddExpenseForm;
