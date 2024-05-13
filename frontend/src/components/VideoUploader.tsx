import React, { useState } from 'react';
import { Button, Input } from '@mui/material';

interface VideoUploaderProps {
  onUpload: (file: File) => void; // 親コンポーネントにアップロードイベントを通知
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  // ファイルが選択された時のハンドラ
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      setFile(file);
    }
  };

  // ファイルをサーバーにアップロードするハンドラ
  const handleUpload = async () => {
    if (!file) return; // ファイルが選択されていなければ何もしない

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        onUpload(file);
        alert('Upload successful!');
      } else {
        console.log(response)
        throw new Error('Failed to upload video');
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Input
        type="file"
        inputProps={{ 
            accept: "video/mp4,video/avi"
          }}
        onChange={handleFileChange}
        style={{ marginRight: '10px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!file}
      >
        Upload Video
      </Button>
    </div>
  );
};

export default VideoUploader;
