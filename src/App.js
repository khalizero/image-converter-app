import React, { useState } from "react";
import { Container, CssBaseline, Grid, Paper } from "@mui/material";
import ImageUploader from "./components/ImageUploader";
import ImageConverter from "./components/ImageConverter";
import Sidebar from "./layouts/Sidebar";
import Imagedisplay from "./components/Imagedisplay";

const App = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
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
      <Container component="main" maxWidth="md" style={{ marginTop: "50px" }}>
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
              />
            </Grid>
          </Grid>
        </Paper>
        <Imagedisplay images={uploadedImages} outputFormat={outputFormat} />
      </Container>
    </Sidebar>
  );
};

export default App;
