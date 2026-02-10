"use client"
import { CloudUpload } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface DropZoneProps {
  name: string
  onChange: (files: File[]) => void
}

const DropZone = ({ name, onChange }: DropZoneProps) => {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    noDragEventsBubbling: true,
    preventDropOnDocument: true,
    noClick: true,
    onDrop: (files) => {
      onChange(files)
    }
  });

  return (
    <div>
      <label htmlFor="select-file" {...getRootProps()} className="flex flex-col items-center justify-center p-2 w-full min-h-40 border-2 border-dashed border-stone-400 rounded-sm hover:border-primary/50">
        {acceptedFiles.length > 0 ? (
          <div className="flex flex-col items-center gap-0.5">
            <CloudUpload className="w-8 h-8 text-primary/70" />
            <p className="font-bold">{acceptedFiles[0].name}</p>
            <p className="text-sm text-stone-400">{getFileSize(acceptedFiles[0].size)}</p>
          </div>
        ) : (
          <p className="text-stone-500">
            {isDragActive ? "선택할 파일을 여기에 놓으세요." : "클릭해서 파일을 선택하거나, 탐색기에서 파일을 끌어다 놓으세요."}
          </p>
        )}
      </label>
      <input id="select-file" name={name} {...getInputProps()} />
    </div>

  )
}

const KB = 1024
const MB = 1024 * 1024

const getFileSize = (size: number) => {
  if (size > MB) {
    return `${(size / MB).toFixed(2)} MB`
  } else if (size > KB) {
    return `${(size / KB).toFixed(2)} KB`
  } else {
    return `${size} B`
  }
}

export default DropZone