import mongoose, { Document, Schema } from 'mongoose';

// Interface for GroupType Document extending Mongoose Document
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
    unique: true,
    required: true,
  },
  typeName: {
    type: String,
    required: [true, 'Please provide the group type name'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the group type'],
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
