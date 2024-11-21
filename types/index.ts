
export enum UploadType {
    background,
    audio,
    profileAvatar,
    customCursor
}

export interface FileUploadProps {
    logo?: React.ReactNode;
    title?: string;
    maxFileSize?: string;
    className?: string;
    previousFile?: string | undefined;
    type: UploadType;
  }