"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@components/ui/button";
import useFiles from "@/zustand/useFiles";

interface FileWithPreview extends File {
  preview: string;
}

interface RejectedFile {
  file: File;
  errors: { code: string; message: string }[];
}

const DropAndDragZone = ({ className }: { className: string }) => {
  const { saveFiles } = useFiles();

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [rejected, setRejected] = useState<RejectedFile[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: RejectedFile[]) => {
      if (acceptedFiles.length) {
        setFiles((previousFiles) =>
          previousFiles.concat(
            acceptedFiles.map((file) =>
              Object.assign(file, { preview: URL.createObjectURL(file) })
            )
          )
        );
      }

      if (fileRejections.length) {
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
    maxFiles: 4,
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
      <section className="mt-6">
        {files.length > 0 ||
          (rejected.length > 0 && (
            <div className="flex flex-row items-center justify-between gap-4 sm:flex-col">
              <h2 className="title text-xl font-semibold">Preview</h2>
              <Button variant="outline" onClick={removeAll}>
                Remove all
              </Button>
              {/* <Button
            type="submit"
            className="text-[12px] font-bold uppercase tracking-wider text-background sm:h-9"
          >
            Upload to Cloudinary
          </Button> */}
            </div>
          ))}

        {/* Accepted files */}
        {files.length > 0 && (
          <>
            <h3 className="title mt-6 border-b text-sm">Accepted files</h3>
            <ul className="mt-4 grid grid-cols-4 gap-10 xl:gap-4 sm:grid-cols-2">
              {files.map((file) => (
                <li key={file.name} className="relative h-fit rounded-md ">
                  <Image
                    src={file.preview}
                    alt={file.name}
                    width={100}
                    height={100}
                    onLoad={() => {
                      URL.revokeObjectURL(file.preview);
                    }}
                    className="h-full w-full rounded object-contain"
                  />
                  <button
                    type="button"
                    className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full border border-rose-400 bg-rose-400 transition-colors hover:bg-white"
                    onClick={() => removeFile(file.name)}
                  >
                    <XMarkIcon className="h-4 w-4 fill-white transition-colors hover:fill-rose-400" />
                  </button>
                  <p className="mt-1 text-[12px] font-medium text-stone-500">
                    {file.name}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Rejected Files */}
        {rejected.length > 0 && (
          <>
            <h3 className="title mt-6 border-b text-sm">Rejected Files</h3>
            <ul className="mt-4 flex flex-col">
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
