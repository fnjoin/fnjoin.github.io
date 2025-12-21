import fs from "fs/promises";
import path from "path";
import express from "express";
import sharp from "sharp";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

async function main() {
    const argv = await yargs(hideBin(process.argv))
        .option("root-dir", {
            type: "string",
            description: "Root directory for images",
            demandOption: true, // Make the root argument required
        })
        .option("port", {
            type: "number",
            description: "Port to listen on",
            default: 3000,
        })
        .option("quality", {
            type: "number",
            description: "Quality of webp images",
            default: 85,
        })
        .option("default-width", {
            type: "number",
            description: "Default width for images",
            default: 800,
        }).argv;

    // Extract the root folder path from the startup arguments
    const rootFolder: string = argv.rootDir;

    const app: express.Application = express();
    const port: number = argv.port;

    app.get("/*", async (req, res) => {
        const { w, q } = req.query;
        const width: number = parseInt(w as string, 10) || argv.defaultWidth;
        const quality: number = parseInt(q as string, 10) || argv.quality;

        const requestedPath: string = path.join(rootFolder, req.path);

        // Use fs to find any file with the same basename but different extension
        const dirPath = path.dirname(requestedPath);
        const baseName = path.basename(
            requestedPath,
            path.extname(requestedPath),
        );

        try {
            const dirFiles = await fs.readdir(dirPath);
            const matchingFiles = dirFiles.filter(
                (file) => path.basename(file, path.extname(file)) === baseName,
            );

            if (matchingFiles.length === 0) {
                console.log("File not found:", requestedPath);
                console.log("Base name:", baseName);
                console.log("Directory files:", dirFiles);
                return res.status(404).send("File not found");
            }

            // Assume the first match is the correct file
            const originalImagePath = path.join(dirPath, matchingFiles[0]);

            return await sharp(originalImagePath)
                .resize(width)
                .webp({ quality })
                .toBuffer()
                .then((data) => res.type("webp").send(data))
                .catch((sharperr) => res.status(500).send(sharperr.message));
        } catch (err) {
            console.log("Directory read error:", err);
            return res.status(404).send("Directory not found");
        }
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

main()
    .then(() => console.log("done"))
    .catch((err) => console.error("error", err));
