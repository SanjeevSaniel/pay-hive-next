'use client';

import useBasePath from '@/hooks/useBasePath';
import useGroupMembers from '@/hooks/useGroupMembers';
import useAppStore from '@/stores/useAppStore';
import { ExpenseCategory, SplitMethod, TransactionType } from '@/types/types';
import {
  Button,
  CheckboxGroup,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  // Switch,
  useDisclosure,
} from '@heroui/react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
// import { useState } from 'react';
// import { FaUser, FaUserFriends } from 'react-icons/fa';
import React from 'react';
import {
  useCheckbox,
  Chip,
  VisuallyHidden,
  tv,
  CheckboxProps,
} from '@heroui/react';

export const CustomCheckbox = (props: CheckboxProps) => {
  const checkbox = tv({
    slots: {
      base: 'border-default hover:bg-default-200',
      content: 'text-default-500 text-sm',
    },
    variants: {
      isSelected: {
        true: {
          base: 'border-green-500 bg-green-500 hover:bg-green-600 hover:border-green-600',
          content: 'text-primary-foreground pl-1',
        },
      },
      isFocusVisible: {
        true: {
          base: 'outline-none ring-2 ring-focus ring-offset-2 ring-offset-background',
        },
      },
    },
  });

  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    ...props,
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color='default'
        startContent={isSelected ? <CheckIcon className='ml-1' /> : null}
        variant='faded'
        {...getLabelProps()} // Ensure we spread getLabelProps() without overriding props
        ref={undefined} // Ensure ref is correctly typed or removed
      >
        {children ? children : isSelected ? 'Enabled' : 'Disabled'}
      </Chip>
    </label>
  );
};

export const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden='true'
      fill='none'
      focusable='false'
      height='1em'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      viewBox='0 0 24 24'
      width='1em'
      {...props}>
      <polyline points='20 6 9 17 4 12' />
    </svg>
  );
};

const AddExpenseForm = () => {
  const { userId, groupId } = useParams();
  const currentUserId = userId; // Fetch userId from params
  const resolvedGroupId = Array.isArray(groupId) ? groupId[0] : groupId; // Ensure groupId is a string
  const router = useRouter();
  const basePath = useBasePath();
  const members = useGroupMembers(resolvedGroupId);
  const addFinancialRecord = useAppStore((state) => state.addFinancialRecord);
  const deleteFinancialRecord = useAppStore(
    (state) => state.deleteFinancialRecord,
  );

  const [groupSelected, setGroupSelected] = React.useState<string[]>([]);
  // const [isMultiple, setIsMultiple] = useState(false);

  // const toggleSelectionMode = () => {
  //   setIsMultiple(!isMultiple);

  //   // Reset payees value in the form
  //   const formElement = document.querySelector('form') as HTMLFormElement;
  //   if (formElement) {
  //     const payeesField = formElement.elements.namedItem(
  //       'payees',
  //     ) as HTMLSelectElement;
  //     if (payeesField) {
  //       payeesField.selectedIndex = -1;
  //     }
  //   }
  // };

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const sortedMembers = [
    ...members.filter((member) => member.userId === currentUserId),
    ...members
      .filter((member) => member.userId !== currentUserId)
      .sort((a, b) => a.name.localeCompare(b.name)),
  ];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const expenseData = {
      description: formData.get('description') as string,
      amount: parseFloat(formData.get('amount') as string), // Ensure amount is a number
      date: new Date(formData.get('date') as string), // Convert date string to Date object
      category: formData.get('category') as ExpenseCategory, // Cast category to ExpenseCategory
      // payees: formData.getAll('payees') as string[], // Handle multiple payees
      payees: groupSelected, // Sync with checkbox selection
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
        onOpenChange={onOpenChange}
        scrollBehavior='inside'
        hideCloseButton={true}
        size='full'>
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
                    <div className='flex flex-col gap-1 w-full'>
                      <CheckboxGroup
                        className='gap-1'
                        label='Paid By'
                        orientation='horizontal'
                        value={groupSelected}
                        onChange={(value: string[]) => setGroupSelected(value)} // Properly type the onChange handler
                      >
                        {sortedMembers.map((member) => (
                          <CustomCheckbox
                            key={member.userId}
                            value={member.userId}>
                            {member.userId === currentUserId
                              ? 'You'
                              : member.name}
                          </CustomCheckbox>
                        ))}
                      </CheckboxGroup>

                      <p className='mt-4 ml-1 text-default-500'>
                        Selected: {groupSelected.join(', ')}
                      </p>
                    </div>
                    <Input
                      isRequired
                      label='Amount'
                      labelPlacement='inside'
                      name='amount'
                      placeholder='Enter amount'
                      startContent={
                        <div className='pointer-events-none flex items-center'>
                          <span className='text-default-400 text-lg'>₹</span>
                        </div>
                      }
                      size='lg'
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

                    <div className='flex gap-2'>
                      <Input
                        isRequired
                        label='Date'
                        labelPlacement='inside'
                        name='date'
                        type='date'
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
                    </div>

                    {/* Payee */}
                    {/* <div className='flex items-center'>
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
                        }`}
                        value={groupSelected}>
                        {members.map((member) => (
                          <SelectItem
                            key={member.userId}
                            value={member.userId}>
                            {member.name}
                          </SelectItem>
                        ))}
                      </Select>
                    </div> */}

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
                    <Button
                      color='danger'
                      variant='light'
                      onPress={onClose}>
                      Cancel
                    </Button>
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
