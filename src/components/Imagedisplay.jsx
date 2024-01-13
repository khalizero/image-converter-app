import React from "react";
import { PDFDocument } from "pdf-lib";
import { Box, Button } from "@mui/material";

import "./Imagedisplay.css";

const Imagedisplay = ({ images, outputFormat }) => {
  const fileToArrBuffer = (file) =>
    new Promise((res, rej) => {
      const fileReader = new FileReader();
      fileReader.onload = () => res(fileReader.result);
      fileReader.onerror = () => rej(fileReader.error);
      fileReader.readAsArrayBuffer(file);
    });

  const downloadFile = async (blob, fileName) => {
    const URL = window.URL.createObjectURL(blob);
    const el = document.createElement("a");
    el.download = fileName;
    el.href = URL;
    el.click();
    window.URL.revokeObjectURL(URL);
  };

  const embedImageInPdfAndDownload = async (file) => {
    const pdfDoc = await PDFDocument.create();

    const buffer = await fileToArrBuffer(file);
    let image;
    if (/jpe?g/i.test(file.type)) image = await pdfDoc.embedJpg(buffer);
    else if (/png/i.test(file.type)) image = await pdfDoc.embedPng(buffer);
    else throw Error("please choose a JPEG or PNG file to proceed");

    const page = pdfDoc.addPage();

    // Fit the image to the page while maintaining its aspect ratio
    const width = page.getSize().width;
    const height = page.getSize().height;
    const scaleFactor = Math.min(width / image.width, height / image.height);

    // Center the image vertically
    const offsetX = (width - image.width * scaleFactor) / 2;
    const offsetY = (height - image.height * scaleFactor) / 2;

    page.drawImage(image, {
      width: image.width * scaleFactor,
      height: image.height * scaleFactor,
      x: offsetX,
      y: offsetY,
    });

    let b64Chunk = await pdfDoc.saveAsBase64();
    b64Chunk = "data:application/pdf;base64," + b64Chunk;
    const blob = await (await fetch(b64Chunk)).blob();
    downloadFile(
      blob,
      `converted_image_${Math.random() * 199}.${outputFormat}`
    );
  };

  const handleDownload = async (file, index) => {
    try {
      const imageSrc = URL.createObjectURL(file);
      const image = new Image();
      image.src = imageSrc;

      await new Promise((resolve) => {
        image.onload = resolve;
      });

      const width = image.naturalWidth;
      const height = image.naturalHeight;

      if (!width || !height) {
        console.error("Image dimensions are not available.");
        return;
      }

      if (outputFormat === "pdf") {
        embedImageInPdfAndDownload(file);
      } else {
        console.log(image.src);

        const a = document.createElement("a");
        a.href = image.src;
        a.download = `converted_image_${index}.${outputFormat}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error("Client error:", error);
    }
  };

  return (
    <Box className="container">
      {images.map((file, index) => (
        <div key={index} className="item">
          <img
            src={URL.createObjectURL(file)}
            alt={`Converted  ${index}`}
            style={{ maxWidth: "100%" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleDownload(file, index)}
          >
            Download
          </Button>
        </div>
      ))}
    </Box>
  );
};

export default Imagedisplay;
