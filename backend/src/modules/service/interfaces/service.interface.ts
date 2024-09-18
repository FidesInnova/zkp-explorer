import { Document } from 'mongoose';

export interface Service extends Document {
  userId: string;
  nodeId: string;
  nodeServiceId: string;
  serviceName: string;
  description: string;
  serviceType: string;
  status: string;
  devices: [];
  numberOfInstallations: number;
  installationPrice: number;
  runningPrice: number;
  rate: number;
  serviceImage: string;
  blocklyJson: string;
  code: string;
  published: boolean;
  publishRequested: boolean;
  publishRejected: boolean;
  insertedBy: string;
  insertDate: string;
  isDeletable: boolean;
  isDeleted: boolean;
  deletedBy: string;
  deleteDate: string;
  deletionReason: string;
  updatedBy: string;
  updateDate: string;
}
