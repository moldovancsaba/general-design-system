import { UploadDropzone } from '@sovereignsquad/gds';

export const Idle = () => (
  <UploadDropzone
    title="Drag & drop files to upload"
    description="or click to browse from your device"
    acceptedTypesLabel="PNG, JPG, or PDF"
    maxSizeLabel="Up to 10 MB"
    actionLabel="Choose files"
    mode="panel"
    state="idle"
  />
);

export const Selected = () => (
  <UploadDropzone
    title="Ready to upload"
    description="2 files selected"
    mode="panel"
    state="selected"
    selectedFiles={['quarterly-report.pdf', 'cover-image.png']}
    actionLabel="Upload now"
  />
);

export const Error = () => (
  <UploadDropzone
    title="Upload failed"
    description="Check your connection and try again."
    mode="panel"
    state="upload-failed"
    selectedFiles={['archive.zip']}
    error="The file exceeds the 10 MB limit."
  />
);
