import React from 'react';
import ProjectsSection from './ProjectsSection';
import { ImageTrailDemo } from "./components/ui/image-trail-demo"
import { Navigation } from './Navigation'; // Changed this line
import { Footer } from "./components/Footer"

function App() {
  return (
    <>
      {/* Only render the ProjectsSection - the rest is handled by vanilla JS */}
      {/* <Navigation /> */}
      <ProjectsSection />
      <ImageTrailDemo />
      <Footer />
    </>
  );
}

export default App;