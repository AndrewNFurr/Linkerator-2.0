// small script for using `react-scripts build` during development
// the build process is slow, so when changing client side code, wait 5-10 seconds then refresh

const fs = require("fs");
const { exec } = require("child_process");

fs.watch(
  "./src",
  {
    recursive: true,
  },
  (eventType) => {
    if (eventType === "change") {
      exec("npm run build");
    }
  }
);
