if (process.env.NODE_ENV === "development") {
  require("./.cache/_dev/electron-app.js");
} else {
  throw "production setup is not yet configured!";
}
