import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditer from "@ckeditor/ckeditor5-build-classic";

function App() {
  return <CKEditor editor={ClassicEditer} />;
}

export default App;
