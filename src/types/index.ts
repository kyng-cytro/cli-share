export interface UserDetailsResponse {
  success: boolean;
  status: number;
  planId: number;
  maxUploadBytes: number;
  maxStorageBytes: number;
  usedStorageBytes: number;
  rateLimit: number;
}

export interface FileDetailsResponse {
  success: boolean;
  status: number;
  id: string;
  key: string;
  name: string;
  link: string;
  expires: string;
  expiry: string;
  downloads: number;
  maxDownloads: number;
  autoDelete: boolean;
  size: number;
  mimeType: string;
  created: string;
  modified: string;
}
