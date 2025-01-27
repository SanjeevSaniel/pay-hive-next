'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import LogoutButton from './LogoutButton';

const Account = () => {
  return (
    <div className='flex flex-col space-y-3 p-2'>
      <h1 className='text-lg'>Account</h1>
      <Accordion
        type='single'
        collapsible
        className='w-full mt-2'>
        <AccordionItem value='item-1'>
          <AccordionTrigger>Personal Information</AccordionTrigger>
          <AccordionContent className='flex flex-col items-start p-1'>
            <p>Name: John Doe</p>
            <p>Email: john.doe@example.com</p>
            <p>Phone: +91-12345-67890</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>Account Settings</AccordionTrigger>
          <AccordionContent>
            <button>Change Password</button>
            <button>Two-Factor Authentication</button>
            <button>Manage Connected Devices</button>
            <button>Delete Account</button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionTrigger>Payment Methods</AccordionTrigger>
          <AccordionContent>
            <button>Add New Payment Method</button>
            <ul>
              <li>Visa **** **** **** 1234</li>
              <li>MasterCard **** **** **** 5678</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-4'>
          <AccordionTrigger>Transaction History</AccordionTrigger>
          <AccordionContent>
            <button>Export History</button>
            <ul>
              <li>Expense: ₹500 - Dinner</li>
              <li>Expense: ₹1000 - Groceries</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-5'>
          <AccordionTrigger>Preferences</AccordionTrigger>
          <AccordionContent>
            <label>
              <input type='checkbox' /> Email Notifications
            </label>
            <label>
              <input type='checkbox' /> SMS Notifications
            </label>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-6'>
          <AccordionTrigger>Security Settings</AccordionTrigger>
          <AccordionContent className='flex flex-col justify-center items-start p-1'>
            <button>Login History</button>
            <button>Active Sessions</button>
            <button>Security Questions</button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-7'>
          <AccordionTrigger>Support</AccordionTrigger>
          <AccordionContent>
            <button>Help Center</button>
            <button>Contact Support</button>
            <button>FAQ</button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <LogoutButton />
    </div>
  );
};

export default Account;
