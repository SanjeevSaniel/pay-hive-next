'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useAppStore from '../stores/useAppStore';
import { Button } from './ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';

const formSchema = z.object({
  groupName: z
    .string()
    .min(2, { message: 'Group name must be at least 2 characters long' })
    .max(50, { message: 'Group name must be at most 50 characters long' }),
  description: z
    .string()
    .min(5, { message: 'Description must be at least 5 characters long' })
    .max(200, { message: 'Description must be at most 200 characters long' }),
  isGroup: z.boolean(),
});

type Inputs = z.infer<typeof formSchema>;

const CreateGroup = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const addGroup = useAppStore((state) => state.addGroup);
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupName: '',
      description: '',
      isGroup: true,
    },
  });

  const onSubmit = async (data: Inputs) => {
    try {
      const response = await axios.post('/api/groups/create', {
        groupName: data.groupName,
        description: data.description,
        memberIds: [],
        isGroup: data.isGroup,
      });

      console.log('Group created successfully', response.data);

      const newGroup = response.data;
      addGroup(newGroup);
      form.reset(); // Reset the form after submission
      setIsDrawerOpen(false); // Close the drawer after form submission
    } catch (error: unknown) {
      // Use `unknown` instead of `any`
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
        <Button className='flex items-center gap-1 py-6 fixed right-6 bottom-32 rounded-full'>
          <Plus />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>New Group</DrawerTitle>
          {/* <DrawerDescription>
            Fill in the details below to create a new group.
          </DrawerDescription> */}
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
                  {/* <FormLabel>Group Name</FormLabel> */}
                  <FormControl>
                    <Input
                      className='h-fit text-2xl'
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
                  {/* <FormLabel>Description</FormLabel> */}
                  <FormControl>
                    <Input
                      className='h-fit text-2xl'
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
              name='isGroup'
              render={({ field }) => (
                <FormItem className='flex items-center p-2 space-x-3 space-y-0.5'>
                  <FormControl>
                    <Checkbox
                      defaultChecked={field.value}
                      onChange={(e) => field.onChange(e)}
                      className='w-5 h-5'
                    />
                  </FormControl>
                  <FormLabel className='text-xl'>Is Group</FormLabel>
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
              onClick={() => form.reset()}
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

export default CreateGroup;
