
export interface UploadedImage {
  base64: string;
  mimeType: string;
  previewUrl: string;
}

export interface GeneratedContent {
  imageUrl: string | null;
  text: string | null;
}