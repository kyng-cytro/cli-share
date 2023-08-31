export interface UserDetailsResponse {
  success: boolean;
  status: number;
  planId: number;
  code?: string;
  maxUploadBytes: number;
  maxStorageBytes: number;
  usedStorageBytes: number;
  rateLimit: number;
}

export interface FileDetailsResponse extends FileDetails {
  success: boolean;
  status: number;
  code?: string;
  size: number;
}

export interface FileDetails {
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

export interface FileDetailsResponseList {
  success: boolean;
  status: number;
  nodes: FileDetails[];
  size: number;
  code?: string;
}
