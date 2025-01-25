import React from 'react';

const UserProfile = ({ params }: any) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1>Profile Page</h1>
      <hr />
      <p className='text-4xl'>
        Profile{' '}
        <span className='px-1 bg-orange-600 rounded-lg'>{params.id}</span>
      </p>
    </div>
  );
};

export default UserProfile;
