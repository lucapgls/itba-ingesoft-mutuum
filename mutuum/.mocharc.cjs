module.exports = {
    require: "@babel/register",
    extensions: ["ts", "tsx", "js"],
    spec: "test/**/*.{js,ts,tsx}",
    timeout: 10000
  };
  