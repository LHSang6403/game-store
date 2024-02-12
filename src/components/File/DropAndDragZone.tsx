"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { getSignature, saveToDatabase } from "./_actions/index";

interface FileWithPreview extends File {
  preview: string;
}

interface RejectedFile {
  file: File;
  errors: { code: string; message: string }[];
}

const DropAndDragZone = ({ className }: { className: string }) => {
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
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

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

    const { timestamp, signature } = await getSignature();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp.toString());
    formData.append("folder", "next");

    const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL!;
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    await saveToDatabase({
      version: response?.version,
      signature: response?.signature,
      public_id: response?.public_id,
    });
  };

  return (
    <form action={action}>
      <div
        {...getRootProps({
          className: className,
        })}
      >
        <input {...getInputProps({ name: "file" })} />
        <div className="w-full flex flex-col items-center justify-center gap-4 text-justify">
          <ArrowUpTrayIcon className="h-5 w-5 fill-current" />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className="mt-10">
        <div className="flex flex-row sm:flex-col gap-4">
          <h2 className="title text-3xl font-semibold">Preview</h2>
          <button
            type="button"
            onClick={removeAll}
            className="mt-1 sm:h-9 rounded-md border border-rose-400 px-3 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-rose-400 hover:text-white"
          >
            Remove all files
          </button>
          <button
            type="submit"
            className="mt-1 sm:h-9 rounded-md border border-purple-400 px-3 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-purple-400 hover:text-white"
          >
            Upload to Cloudinary
          </button>
        </div>

        {/* Accepted files */}
        <h3 className="title mt-10 border-b pb-3 text-lg font-semibold text-stone-600">
          Accepted Files
        </h3>
        <ul className="mt-6 grid gap-10 xl:gap-4 grid-cols-4 sm:grid-cols-2">
          {files.map((file) => (
            <li key={file.name} className="relative h-32 rounded-md shadow-lg">
              <Image
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
                className="h-full w-full rounded-md object-contain"
              />
              <button
                type="button"
                className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full border border-rose-400 bg-rose-400 transition-colors hover:bg-white"
                onClick={() => removeFile(file.name)}
              >
                <XMarkIcon className="h-5 w-5 fill-white transition-colors hover:fill-rose-400" />
              </button>
              <p className="mt-2 text-[12px] font-medium text-stone-500">
                {file.name}
              </p>
            </li>
          ))}
        </ul>

        {/* Rejected Files */}
        {rejected.length > 0 && (
          <>
            <h3 className="title mt-24 border-b pb-3 text-lg font-semibold text-stone-600">
              Rejected Files
            </h3>
            <ul className="mt-6 flex flex-col">
              {rejected.map(({ file, errors }) => (
                <li
                  key={file.name}
                  className="flex items-start justify-between"
                >
                  <div>
                    <p className="mt-2 text-sm font-medium text-stone-500">
                      {file.name}
                    </p>
                    <ul className="text-[12px] text-red-400">
                      {errors.map((error) => (
                        <li key={error.code}>{error.message}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    className="mt-1 rounded-md border border-rose-400 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-rose-400 hover:text-white"
                    onClick={() => removeRejected(file.name)}
                  >
                    remove
                  </button>
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
