const CleanCSS = require("clean-css");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });
  eleventyConfig.addPassthroughCopy({
    "./assets/CaskaydiaCove-Regular.ttf": "CaskaydiaCove-Regular.ttf",
  });

  return {
    dir: {
      output: "_site",
    },
  };
};
