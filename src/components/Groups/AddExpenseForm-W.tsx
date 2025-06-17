'use client';

// import useBasePath from '@/hooks/useBasePath';
import useGroupMembers from '@/hooks/useGroupMembers';
import useAppStore from '@/stores/useAppStore';
import {
  ExpenseCategory,
  // Payee,
  SplitDetail,
  SplitMethod,
  TransactionCategory,
} from '@/types/types';
import {
  Button,
  CheckboxGroup,
  // Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
  useCheckbox,
  Chip,
  VisuallyHidden,
  tv,
  CheckboxProps,
} from '@heroui/react';
// import axios from 'axios';
import { Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

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
        {...getLabelProps()}
        ref={undefined}>
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
  const currentUserId = userId;
  const resolvedGroupId = Array.isArray(groupId) ? groupId[0] : groupId;
  // const router = useRouter();
  // const basePath = useBasePath();
  const members = useGroupMembers(resolvedGroupId);
  const addFinancialRecord = useAppStore((state) => state.addFinancialRecord);
  const deleteFinancialRecord = useAppStore(
    (state) => state.deleteFinancialRecord,
  );

  const [amountPaidByPayees, setAmountPaidByPayees] = useState<
    Record<string, number>
  >({});

  const [groupSelected, setGroupSelected] = useState<string[]>([]);
  const [splitMethod, setSplitMethod] = useState<SplitMethod>(
    SplitMethod.Equal,
  );
  const [splitDetails, setSplitDetails] = useState<SplitDetail[]>([]);
  const [selectedSplitMethod, setSelectedSplitMethod] = useState<SplitMethod>(
    SplitMethod.Equal,
  );

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const sortedMembers = [
    ...members.filter((member) => member.userId === currentUserId),
    ...members
      .filter((member) => member.userId !== currentUserId)
      .sort((a, b) => a.name.localeCompare(b.name)),
  ];

  const handleAmountPaidChange = (userId: string, amount: number) => {
    setAmountPaidByPayees((prev) => ({
      ...prev,
      [userId]: amount || 0,
    }));

    if (selectedSplitMethod === SplitMethod.Equal) {
      const totalPaid = Object.values({
        ...amountPaidByPayees,
        [userId]: amount || 0,
      }).reduce((sum, val) => sum + val, 0);

      const share = totalPaid / sortedMembers.length;
      const details = sortedMembers.map((member) => ({
        userId: member.userId,
        amount:
          (amountPaidByPayees[member.userId] || 0) +
          (member.userId === userId ? amount : 0) -
          share,
      }));
      setSplitDetails(details);
    }
  };

  const renderAmountPaidInputs = () => {
    return (
      <div className='flex flex-col gap-2'>
        {groupSelected.map((userId) => (
          <Input
            key={userId}
            label={`Amount Paid by ${
              sortedMembers.find((m) => m.userId === userId)?.name || userId
            }`}
            required
            labelPlacement='inside'
            placeholder='Enter amount'
            type='number'
            onChange={(e) =>
              handleAmountPaidChange(userId, parseFloat(e.target.value))
            }
          />
        ))}
      </div>
    );
  };

  const handleSplitMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const method = e.target.value as SplitMethod;
    setSelectedSplitMethod(method);
    setSplitMethod(method);

    const payeeAmounts = groupSelected.reduce((acc, userId) => {
      acc[userId] = amountPaidByPayees[userId] || 0;
      return acc;
    }, {} as Record<string, number>);

    const totalPaid = Object.values(payeeAmounts).reduce(
      (sum, val) => sum + val,
      0,
    );

    if (method === SplitMethod.Equal) {
      const amountPerPayee = totalPaid / sortedMembers.length; // Total members
      const details = sortedMembers.map((member) => {
        const paidAmount = payeeAmounts[member.userId] || 0;
        return {
          userId: member.userId,
          amount: paidAmount - amountPerPayee,
        };
      });
      setSplitDetails(details);
    } else {
      setSplitDetails(
        sortedMembers.map((member) => ({ userId: member.userId, amount: 0 })),
      );
    }
  };

  const renderSplitMethodInputs = () => {
    if (!sortedMembers.length) return null;

    const totalPaid = Object.values(amountPaidByPayees).reduce(
      (sum, val) => sum + val,
      0,
    );

    switch (selectedSplitMethod) {
      case SplitMethod.Percentage:
        return (
          <div className='flex flex-col gap-2'>
            {sortedMembers.map((member) => (
              <Input
                key={member.userId}
                label={`Percentage for ${member.name || member.userId}`}
                required
                labelPlacement='inside'
                placeholder='Enter percentage'
                type='number'
                onChange={(e) => {
                  const percentage = parseFloat(e.target.value);
                  const updatedDetails = splitDetails.map((detail) =>
                    detail.userId === member.userId
                      ? {
                          ...detail,
                          amount:
                            (percentage / 100) * totalPaid -
                            amountPaidByPayees[member.userId],
                        }
                      : detail,
                  );
                  setSplitDetails(updatedDetails);
                }}
              />
            ))}
          </div>
        );

      case SplitMethod.Custom:
        return (
          <div className='flex flex-col gap-2'>
            {sortedMembers.map((member) => (
              <Input
                key={member.userId}
                label={`Amount for ${member.name || member.userId}`}
                labelPlacement='inside'
                placeholder='Enter amount'
                type='number'
                onChange={(e) => {
                  const customAmount = parseFloat(e.target.value);
                  const updatedDetails = splitDetails.map((detail) =>
                    detail.userId === member.userId
                      ? {
                          ...detail,
                          amount:
                            customAmount - amountPaidByPayees[member.userId],
                        }
                      : detail,
                  );
                  setSplitDetails(updatedDetails);
                }}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const validateSplitDetails = () => {
    const totalPaid = Object.values(amountPaidByPayees).reduce(
      (sum, val) => sum + val,
      0,
    );

    if (!totalPaid) return false;

    switch (splitMethod) {
      case SplitMethod.Equal:
        const share = totalPaid / sortedMembers.length;
        const equalSplitDetails = sortedMembers.map((member) => ({
          userId: member.userId,
          amount: (amountPaidByPayees[member.userId] || 0) - share,
        }));
        setSplitDetails(equalSplitDetails);
        return true;

      case SplitMethod.Percentage:
        const totalPercentage = splitDetails.reduce((sum, detail) => {
          const percentage =
            ((detail.amount + (amountPaidByPayees[detail.userId] || 0)) /
              totalPaid) *
            100;
          return sum + percentage;
        }, 0);
        return Math.abs(totalPercentage - 100) < 0.01;

      case SplitMethod.Custom:
        const totalShares = splitDetails.reduce(
          (sum, detail) =>
            sum + detail.amount + (amountPaidByPayees[detail.userId] || 0),
          0,
        );
        return Math.abs(totalShares - totalPaid) < 0.01;

      default:
        return false;
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (groupSelected.length === 0) {
      alert('Please select at least one person who paid');
      return;
    }

    const totalPaid = Object.values(amountPaidByPayees).reduce(
      (sum, val) => sum + val,
      0,
    );

    if (totalPaid <= 0) {
      alert('Total paid amount must be greater than 0');
      return;
    }

    if (!validateSplitDetails()) {
      alert('Split amounts do not match the total paid amount');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const description = formData.get('description') as string;
    const date = formData.get('date') as string;
    const category = formData.get('category') as ExpenseCategory;
    const type = formData.get('type') as TransactionCategory;

    if (!description || !date || !category || !type) {
      alert('Please fill in all required fields');
      return;
    }

    const expenseData = {
      recordId: `temp-${Date.now()}`,
      description,
      amount: totalPaid,
      date: new Date(date),
      category,
      payees: groupSelected.map((userId) => ({
        userId,
        paidAmount: amountPaidByPayees[userId] || 0,
      })),
      groupId: resolvedGroupId,
      transactionCategory: type,
      splitMethod,
      splitDetails,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('Expense Data: ', expenseData);

    try {
      addFinancialRecord(expenseData);
      onClose();
    } catch (error) {
      console.error('Failed to save expense:', error);
      deleteFinancialRecord(expenseData.recordId);
    }
  };

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
                <form
                  className='w-full'
                  onSubmit={onSubmit}>
                  <div className='grid grid-cols-1 gap-2 w-full'>
                    <CheckboxGroup
                      className='gap-1'
                      label='Paid By'
                      orientation='horizontal'
                      value={groupSelected}
                      onChange={(value: string[]) => setGroupSelected(value)}>
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

                    {renderAmountPaidInputs()}

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
                    />

                    <Input
                      isRequired
                      label='Description'
                      labelPlacement='inside'
                      name='description'
                      placeholder='Enter description'
                      type='text'
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

                    <Select
                      isRequired
                      label='Transaction Type'
                      labelPlacement='inside'
                      name='type'
                      placeholder='Select Type'>
                      {Object.values(TransactionCategory).map((type) => (
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
                      name='splitMethod'
                      value={selectedSplitMethod}
                      onChange={handleSplitMethodChange}
                      placeholder='Select split method'>
                      {Object.values(SplitMethod).map((method) => (
                        <SelectItem
                          key={method}
                          value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </Select>

                    {renderSplitMethodInputs()}
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
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddExpenseForm;
