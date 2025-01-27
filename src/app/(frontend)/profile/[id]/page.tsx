import React from 'react';

const UserProfile = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1>Profile Page</h1>
      <hr />
      <p className='text-4xl'>
        Profile <span className='px-1 bg-orange-600 rounded-lg'>{id}</span>
      </p>
    </div>
  );
};

export default UserProfile;
