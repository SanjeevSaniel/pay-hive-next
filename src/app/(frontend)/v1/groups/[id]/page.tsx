const GroupDetails = ({ params }: { params: { groupId: string } }) => {
  const { groupId } = params;

  return <div>GroupDetails {groupId}</div>;
};

export default GroupDetails;
