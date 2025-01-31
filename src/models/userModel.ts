import mongoose, { Document, Schema } from 'mongoose';

// Utility function to generate a random 6-character string
const generateRandomString = (length: number): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Middleware to auto-generate userId
const autoGenerateUserId = (schema: Schema) => {
  schema.pre<UserDocument>('save', function (next) {
    if (this.isNew) {
      this.createdAt = new Date();
      const firstName = this.name.split(' ')[0];
      this.userId = firstName + generateRandomString(6);
    }
    this.updatedAt = new Date();
    next();
  });
};

// Interface for Notification Preferences
interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
}

// Interface for User Document extending Mongoose Document
export interface UserDocument extends Document {
  userId: string;
  name: string;
  email: string;
  password: string;
  profileImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  notificationPreferences: NotificationPreferences;
  role: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpires?: Date;
  verifyEmailToken?: string;
  verifyEmailTokenExpires?: Date;
  groupIds: string[]; // List of group IDs the user belongs to
}

const notificationPreferencesSchema = new Schema<NotificationPreferences>({
  emailNotifications: { type: Boolean, default: true },
  pushNotifications: { type: Boolean, default: true },
  smsNotifications: { type: Boolean, default: true },
});

const userSchema = new Schema<UserDocument>({
  userId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Please provide your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
  },
  profileImageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  notificationPreferences: notificationPreferencesSchema,
  role: {
    type: String,
    default: 'user',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: {
    type: String,
  },
  forgotPasswordTokenExpires: {
    type: Date,
  },
  verifyEmailToken: {
    type: String,
  },
  verifyEmailTokenExpires: {
    type: Date,
  },
  groupIds: {
    type: [String], // List of group IDs
    default: [],
  },
});

// Apply the middleware to the schema
autoGenerateUserId(userSchema);

const User =
  mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);

export default User;
