import mongoose, { Document, Schema } from 'mongoose';

// Interface for Group Document extending Mongoose Document
export interface GroupDocument extends Document {
  groupId: string;
  groupName: string;
  description: string;
  groupType: string;
  createdDate: Date;
  memberIds: string[];
}

const groupSchema = new Schema<GroupDocument>({
  groupId: {
    type: String,
    unique: true,
    required: true,
  },
  groupName: {
    type: String,
    required: [true, 'Please provide the group name'],
  },
  description: {
    type: String,
  },
  groupType: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  memberIds: {
    type: [String],
    required: true,
  },
});

const Group =
  mongoose.models.Group || mongoose.model<GroupDocument>('Group', groupSchema);

export default Group;
