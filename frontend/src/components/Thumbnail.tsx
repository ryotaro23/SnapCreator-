import React from 'react';

interface ThumbnailProps {
  src: string;  // サムネイル画像のURL
  alt: string;  // 画像の代替テキスト
  onClick: () => void;  // サムネイルがクリックされたときのイベントハンドラ
  imageUrl:string;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ src, alt, onClick }) => {
  return (
    <div className="p-4">
      <img
        src={src}
        alt={alt}
        onClick={onClick}
        className="cursor-pointer hover:opacity-75 transition-opacity duration-300 ease-in-out"
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default Thumbnail;
