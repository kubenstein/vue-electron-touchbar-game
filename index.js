if (process.env.NODE_ENV === "development") {
  require("./.cache/_dev/index.js");
} else {
  throw "production setup is not yet configured!";
}
