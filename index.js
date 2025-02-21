const sharp = require("sharp");
const fs = require("fs-extra");
const path = require("path");

const inputDir = "./input-images";
const outputDir = "./output-images";

const args = process.argv.slice(2);

if (args.length !== 2 || isNaN(args[0]) || isNaN(args[1])) {
  console.error("Usage: node index.js <width> <height>");
  process.exit(1);
}

const width = Number(args[0]);
const height = Number(args[1]);

fs.ensureDirSync(outputDir);

const resizeImages = async () => {
  try {
    const files = await fs.readdir(inputDir);

    console.log(`Found ${files.length} images, starting resizing...`);

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
