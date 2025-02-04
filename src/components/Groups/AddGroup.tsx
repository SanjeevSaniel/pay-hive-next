'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useAppStore from '@/stores/useAppStore';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@heroui/react';

const formSchema = z.object({
  groupName: z
    .string()
    .min(2, { message: 'Group name must be at least 2 characters long' })
    .max(50, { message: 'Group name must be at most 50 characters long' }),
  description: z
    .string()
    .min(0, { message: 'Description must be at least 5 characters long' })
    .max(200, { message: 'Description must be at most 200 characters long' }),
  groupType: z.string().min(2, 'Group type must be chosen.'),
});

type Inputs = z.infer<typeof formSchema>;

const AddGroup = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const addGroup = useAppStore((state) => state.addGroup);
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupName: '',
      description: '',
      groupType: '',
    },
  });

  const onSubmit = async (data: Inputs) => {
    try {
      const response = await axios.post('/api/groups/create', {
        groupName: data.groupName,
        description: data.description,
        memberIds: [],
        groupType: data.groupType,
      });

      console.log('Group created successfully', response.data);

      const newGroup = response.data;
      addGroup(newGroup);
      form.reset(); // Reset the form after submission
      setIsDrawerOpen(false); // Close the drawer after form submission
    } catch (error: unknown) {
      console.error('Failed to create group', error); // Log the error

      // Handle the error safely
      if (error instanceof Error) {
        // If the error is an instance of Error, display its message
        console.error(error.message);
      } else {
        // If the error is not an Error object, display a generic message
        console.error('Failed to create group');
      }
    }
  };

  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <Button
          aria-label='New'
          size='md'
          variant='solid'
          className='rounded-xl'
          onPress={() => setIsDrawerOpen(true)} // Use onPress instead of onClick
        >
          <Plus /> Add Group
        </Button>
      </DrawerTrigger>
      <DrawerContent
        aria-labelledby='drawer-title'
        aria-describedby='drawer-description'>
        <DrawerHeader>
          <DrawerTitle>New Group Details</DrawerTitle>
          <DrawerDescription>
            Please provide the details to create a new group.
          </DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-5 px-5 pt-2'>
            <FormField
              control={form.control}
              name='groupName'
              render={({ field }) => (
                <FormItem className='space-y-0.5'>
                  <FormControl>
                    <Input
                      required
                      className='h-fit text-lg'
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
                  <FormControl>
                    <Input
                      className='h-fit text-lg'
                      placeholder='Description'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='groupType'
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='text-lg'>
                        <SelectValue placeholder='Select a group type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value='type1'
                        className='text-lg'>
                        Type 1
                      </SelectItem>
                      <SelectItem
                        value='type2'
                        className='text-lg'>
                        Type 2
                      </SelectItem>
                      <SelectItem
                        value='type3'
                        className='text-lg'>
                        Type 3
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              size='lg'
              type='submit'
              className='w-full'>
              Submit
            </Button>
          </form>
        </Form>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button
              onPress={() => form.reset()} // Use onPress instead of onClick
              variant='ghost'
              className='w-full'>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddGroup;
