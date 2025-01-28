'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useStore from '../stores/store'; // Adjust the import path as needed
import { Plus } from 'lucide-react';
import { z } from 'zod';
import { Button } from './ui/button';
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from './ui/drawer';
import { Input } from './ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { useState } from 'react';

const formSchema = z.object({
  groupName: z
    .string()
    .min(2, { message: 'Group name must be at least 2 characters long' })
    .max(50, { message: 'Group name must be at most 50 characters long' }),
  description: z
    .string()
    .min(5, { message: 'Description must be at least 5 characters long' })
    .max(200, { message: 'Description must be at most 200 characters long' }),
});

type Inputs = z.infer<typeof formSchema>;

const CreateGroup: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const addGroup = useStore((state) => state.addGroup);
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupName: '',
      description: '',
    },
  });

  const onSubmit = (data: Inputs) => {
    const newGroup = {
      groupId: String(Date.now()),
      groupName: data.groupName,
      description: data.description,
      owedAmount: 0,
      borrowedAmount: 0,
      isGroup: true,
      createdDate: new Date().toISOString(),
      membersCount: 0,
      memberIds: [],
      transactions: [],
    };
    console.log('New Group: ', newGroup);

    addGroup(newGroup);
    form.reset(); // Reset the form after submission
    setIsDrawerOpen(false); // Close the drawer after form submission
  };

  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <Button className='flex items-center gap-1 py-6 fixed right-6 bottom-48 rounded-full'>
          <Plus />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create a New Group</DrawerTitle>
          <DrawerDescription>
            Fill in the details below to create a new group.
          </DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='px-4 space-y-4'>
            <FormField
              control={form.control}
              name='groupName'
              render={({ field }) => (
                <FormItem className='space-y-0.5'>
                  <FormLabel>Group Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Group Name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='space-y-0.5'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Description'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='w-full'>
              Submit
            </Button>
          </form>
        </Form>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button
              variant='outline'
              className='w-full'>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateGroup;
