import React from "react";
import { Paper, Typography, Select, MenuItem, Button } from "@mui/material";
import { PDFDocument } from "pdf-lib";

const ImageConverter = ({ images, outputFormat, setOutputFormat }) => {
  const handleOutputFormatChange = (event) => {
    setOutputFormat(event.target.value);
  };

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

  const handleDownloadAll = async () => {
    if (outputFormat === "pdf") {
      try {
        const pdfDoc = await PDFDocument.create();

        for (let i = 0; i < images.length; i++) {
          const file = images[i];
          const buffer = await fileToArrBuffer(file);
          let image;

          if (/jpe?g/i.test(file.type)) image = await pdfDoc.embedJpg(buffer);
          else if (/png/i.test(file.type))
            image = await pdfDoc.embedPng(buffer);
          else throw Error("please choose a JPEG or PNG file to proceed");

          const page = pdfDoc.addPage();

          // Fit the image to the page while maintaining its aspect ratio
          const width = page.getSize().width;
          const height = page.getSize().height;
          const scaleFactor = Math.min(
            width / image.width,
            height / image.height
          );

          // Center the image vertically
          const offsetX = (width - image.width * scaleFactor) / 2;
          const offsetY = (height - image.height * scaleFactor) / 2;

          page.drawImage(image, {
            width: image.width * scaleFactor,
            height: image.height * scaleFactor,
            x: offsetX,
            y: offsetY,
          });
        }

        const b64Chunk = await pdfDoc.saveAsBase64();
        const blob = await (
          await fetch("data:application/pdf;base64," + b64Chunk)
        ).blob();
        downloadFile(blob, "all_images.pdf");
      } catch (error) {
        console.error("Client error:", error);
      }
    } else {
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const a = document.createElement("a");
        a.href = URL.createObjectURL(img);
        a.download = `converted_image_${img?.name}.${outputFormat}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
      }
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Image Converter
      </Typography>
      <div style={{ marginBottom: "20px" }}>
        <Typography variant="body1" style={{ display: "inline" }}>
          Output Format:
        </Typography>
        <Select
          value={outputFormat}
          onChange={handleOutputFormatChange}
          style={{ marginLeft: "10px" }}
          sx={{
            ".MuiSelect-select": {
              padding: "7px 33px 7px 10px",
            },
          }}
        >
          <MenuItem value="png">PNG</MenuItem>
          <MenuItem value="jpg">JPG</MenuItem>
          <MenuItem value="jpeg">JPEG</MenuItem>
          <MenuItem value="pdf">PDF</MenuItem>
        </Select>
      </div>
      {images.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownloadAll}
          disabled={images.length < 1}
          style={{ marginBottom: "14px" }}
        >
          Download All
        </Button>
      )}
      <Typography variant="body1">Image Conversion Results:</Typography>
    </Paper>
  );
};

export default ImageConverter;
