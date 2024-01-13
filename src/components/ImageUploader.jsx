import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Paper, Typography } from "@mui/material";

const ImageUploader = ({ onFileUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onFileUpload(acceptedFiles);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Image Uploader
      </Typography>
      <div
        {...getRootProps()}
        style={{
          margin: "20px",
          padding: "20px",
          border: "2px dashed #cccccc",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography variant="body1">Drop the files here...</Typography>
        ) : (
          <Typography variant="body1">
            Drag & drop images here, or click to select files
          </Typography>
        )}
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => document.getElementById("fileInput").click()}
      >
        Choose Files
      </Button>
      <input
        id="fileInput"
        type="file"
        multiple
        style={{ display: "none" }}
        {...getInputProps()}
      />
    </Paper>
  );
};

export default ImageUploader;
