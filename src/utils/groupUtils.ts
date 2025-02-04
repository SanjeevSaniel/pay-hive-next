export const createDefaultGroup = (userId: string) => ({
  groupName: 'General Expenses',
  description: 'Expenses not associated with any specific group',
  groupType: 'default',
  memberIds: [userId],
});
