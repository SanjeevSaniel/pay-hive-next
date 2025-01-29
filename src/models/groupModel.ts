import mongoose, { Document, Schema } from 'mongoose';

// Interface for Group Document extending Mongoose Document
export interface GroupDocument extends Document {
  groupId: string;
  groupName: string;
  description: string;
  owedAmount: number;
  borrowedAmount: number;
  isGroup: boolean;
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
  owedAmount: {
    type: Number,
    default: 0,
  },
  borrowedAmount: {
    type: Number,
    default: 0,
  },
  isGroup: {
    type: Boolean,
    default: true,
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
