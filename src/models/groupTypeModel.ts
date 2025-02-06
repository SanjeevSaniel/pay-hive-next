import mongoose, { Document, Schema } from 'mongoose';

export interface GroupTypeDocument extends Document {
  typeId: string;
  typeName: string;
  description: string;
  createdDate: Date;
  updatedDate: Date;
}

const groupTypeSchema = new Schema<GroupTypeDocument>({
  typeId: {
    type: String,
    required: true,
    unique: true,
  },
  typeName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});

const GroupType =
  mongoose.models.GroupType ||
  mongoose.model<GroupTypeDocument>('GroupType', groupTypeSchema);

export default GroupType;
