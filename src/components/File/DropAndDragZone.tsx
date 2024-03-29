"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@components/ui/button";
import useFiles from "@/zustand/useFiles";
import { FileWithPreview } from "@utils/types";
import ImageFileItem from "@components/File/ImageFileItem";

interface RejectedFile {
  file: File;
  errors: { code: string; message: string }[];
}

const DropAndDragZone = ({
  className,
  maxFiles,
}: {
  className: string;
  maxFiles?: number;
}) => {
  const { saveFiles } = useFiles();

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [rejected, setRejected] = useState<RejectedFile[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: RejectedFile[]) => {
      if (acceptedFiles?.length) {
        setFiles((previousFiles) =>
          previousFiles.concat(
            acceptedFiles.map((file) =>
              Object.assign(file, { preview: URL.createObjectURL(file) })
            )
          )
        );
      }

      if (fileRejections?.length) {
        setRejected((previousFiles) =>
          previousFiles.concat(
            fileRejections.map(({ file, errors }) => ({
              file,
              errors: errors.map((error) => ({
                code: error.code,
                message: error.message,
              })),
            }))
          )
        );
      }
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 5120 * 1000,
    maxFiles: maxFiles ?? 4,
    onDrop,
  });

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  useEffect(() => {
    saveFiles(files);
  }, [files, saveFiles]);

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = (name: string) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  const action = async () => {
    const file = files[0];
    if (!file) return;
    console.log(file);
  };

  return (
    <form action={action} className="h-fit w-fit">
      <div
        {...getRootProps({
          className: className,
        })}
      >
        <input {...getInputProps({ name: "file" })} />
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <ArrowUpTrayIcon className="h-5 w-5 fill-current" />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className="mb-4 mt-6">
        {/* Accepted files */}
        {files?.length > 0 && (
          <>
            <h3 className="title mt-6 border-b text-sm">Accepted files</h3>
            <div className="mt-4 grid w-fit grid-cols-6 gap-3 sm:grid-cols-4">
              {files.map((file) => (
                <ImageFileItem
                  key={file.name}
                  image={file.preview}
                  name={file.name}
                  removeHandler={() => removeFile(file.name)}
                />
              ))}
            </div>
          </>
        )}

        {/* Rejected Files */}
        {rejected?.length > 0 && (
          <>
            <h3 className="title mt-6 border-b text-sm">Rejected Files</h3>
            <ul className="mt-3 flex flex-col">
              {rejected.map(({ file, errors }) => (
                <li
                  key={file.name}
                  className="flex items-start justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-stone-500">
                      {file.name}
                    </p>
                    <ul className="text-[12px] text-red-400">
                      {errors.map((error) => (
                        <li key={error.code}>{error.message}</li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    className="h-9 border-none text-sm"
                    variant="outline"
                    onClick={() => removeRejected(file.name)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </form>
  );
};

export default DropAndDragZone;
