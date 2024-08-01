import React from 'react';
import { uploadCSV } from '../services/api';
import { notify } from '../utils/Notification';

interface UploadCsvProps {
  label: string;
  apiEndpoint: string;
  onUploadSuccess: () => void;
}

/**
 * Component for uploading CSV file.
 * 
 * @param {UploadCsvProps}
 * @returns {JSX.Element}
 */
const UploadCsv: React.FC<UploadCsvProps> = ({label, apiEndpoint, onUploadSuccess }) => {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        const response = await uploadCSV(apiEndpoint, formData);
        notify(response.data.message, 'success');
        onUploadSuccess();
      } catch(error) {
        console.error('Upload failed:', error);
      }
    }
  };

  return (
    <div>
      <h3>Upload {label} with CSV (<i>Invalid data will be ignored</i>)</h3>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
};

export default UploadCsv;