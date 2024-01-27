import React, { useState } from "react";
import { Container, CssBaseline, Grid, Paper } from "@mui/material";
import ImageUploader from "../components/ImageUploader";
import ImageConverter from "../components/ImageConverter";
import Sidebar from "../layouts/Sidebar";
import Imagedisplay from "../components/Imagedisplay";

const Home = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [compress, setCompress] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [outputFormat, setOutputFormat] = useState("png");

  const handleFileUpload = (files) => {
    setUploadedImages(files);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar}>
      {/* <Container component="main" maxWidth="md" style={{ marginTop: "50px" }}>
        <CssBaseline />
        <Paper
          elevation={3}
          style={{ padding: "30px", textAlign: "center", marginTop: "80px" }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ImageUploader onFileUpload={handleFileUpload} />
            </Grid>
            <Grid item xs={12} md={6}>
              <ImageConverter
                images={uploadedImages}
                outputFormat={outputFormat}
                setOutputFormat={setOutputFormat}
                compress={compress}
                setCompress={setCompress}
              />
            </Grid>
          </Grid>
        </Paper>
        <Imagedisplay
          images={uploadedImages}
          outputFormat={outputFormat}
          compress={compress}
        />
      </Container> */}
      <div className="grid">
        <div className="header-skeleton">
          <input
            type="text"
            placeholder="Search"
            style={{
              borderRadius: "4px",
              padding: "8px 16px",
              display: "flex",
            }}
          />
        </div>
        <div
          className="body"
          style={{
            background: "rgb(0 0 0 / 24%)",
            borderRadius: "5px",
            padding: "12px",
            flex: "1 1 auto",
            overflow: "auto",
          }}
        >
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
          <div className="test_card"></div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Home;
