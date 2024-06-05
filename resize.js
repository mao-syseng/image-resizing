const sharp = require("sharp");
const fs = require("fs-extra");
const path = require("path");

const inputDir = "./admatic-input-images";
const outputDir = "./admatic-output-images";
const width = 800;
const height = 800;

fs.ensureDirSync(outputDir);

const resizeImages = async () => {
  try {
    const files = await fs.readdir(inputDir);

    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|webp|png)$/i.test(file)
    );

    for (const file of imageFiles) {
      const inputFile = path.join(inputDir, file);
      const outputFile = path.join(outputDir, file);

      await sharp(inputFile)
        .resize(width, height, {
          fit: "contain",
          background: { r: 255, g: 255, b: 255, alpha: 1 },
        })
        .toFile(outputFile);
    }
    console.log(
      `Finished resizing ${files.length} images and saved to ${outputDir}`
    );
  } catch (error) {
    console.error("Ran into an issue resizing your images:", error);
  }
};

resizeImages();
