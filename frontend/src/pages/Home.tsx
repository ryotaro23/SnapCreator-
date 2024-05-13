import React, { useState } from 'react';
import VideoUploader from '../components/VideoUploader';
 import Thumbnail from '../components/Thumbnail';
import { Box, Grid, Typography, Button } from '@mui/material';

const Home: React.FC = () => {
  // 動画データとサムネイルデータの状態管理
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  // 動画アップロードのハンドラ
  const handleVideoUpload = (file: File) => {
    setVideoFile(file);
    // ここでバックエンドにアップロードし、サムネイルを生成する処理を呼び出す
    // 疑似的にモックのサムネイル画像を生成
    setThumbnails([
        'https://via.placeholder.com/150x150?text=Thumbnail+1',
        'https://via.placeholder.com/150x150?text=Thumbnail+2',
        'https://via.placeholder.com/150x150?text=Thumbnail+3'
      ]);
  };

  // サムネイル選択時のハンドラ
  const handleThumbnailSelect = (thumbnailUrl: string) => {
    console.log(`Selected thumbnail: ${thumbnailUrl}`);
    // 選択したサムネイルの処理（例：大きなプレビュー表示など）
  };

  // サムネイルダウンロードのハンドラ
  const handleDownload = (thumbnailUrl: string) => {
    console.log(`Downloading thumbnail: ${thumbnailUrl}`);
    // 選択したサムネイルのダウンロード処理
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Video Thumbnail Generators
      </Typography>
      <VideoUploader onUpload={handleVideoUpload} />
      <Grid container spacing={2} mt={2}>
        {thumbnails.map((thumbnail, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Thumbnail 
                    imageUrl={thumbnail}
                    onClick={() => handleThumbnailSelect(thumbnail)} 
                    src={thumbnail}
                    alt={`Thumbnail ${index + 1}`}            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDownload(thumbnail)}
            >
              Download Thumbnail
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
