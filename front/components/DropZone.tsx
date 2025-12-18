"use client"

import { MouseEvent } from "react";
import { useDropzone } from "react-dropzone";

interface DropZoneProps {

}

const DropZone = (p: DropZoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => {
      console.log("on drop", files)
    }
  });

  const handleRightClick = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      const text = await navigator.clipboard.readText();
      console.log(text);
    } catch (err) {
      console.error("클립보드 접근 실패", err);
    }
  }

  return (
    <div {...getRootProps()} onContextMenu={handleRightClick}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      )}
    </div>
  )
}

export default DropZone