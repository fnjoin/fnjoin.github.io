#!/usr/bin/env node

import { Command } from "commander";
import { queryComplete } from "./autocomplete.js";

const program = new Command();

program
    .name("titlesearch")
    .description("CLI tool to search Google autocomplete for keyword research")
    .version("1.0.0");

program
    .command("querycomplete")
    .description("Query Google autocomplete API for keyword suggestions")
    .option("--prefix <prefix>", 'Search prefix (e.g., "how to make")')
    .action(async (options) => {
        if (!options.prefix) {
            console.error("Error: --prefix is required");
            process.exit(1);
        }

        try {
            const suggestions = await queryComplete(options.prefix);

            if (suggestions.length === 0) {
                console.log("No suggestions found");
                return;
            }

            console.log(`\nSuggestions for "${options.prefix}":`);
            console.log("─".repeat(50));

            suggestions.forEach((suggestion: string, index: number) => {
                console.log(`${index + 1}. ${suggestion}`);
            });

            console.log("─".repeat(50));
            console.log(`Found ${suggestions.length} suggestions`);
        } catch (error) {
            console.error(
                "Error fetching suggestions:",
                error instanceof Error ? error.message : error,
            );
            process.exit(1);
        }
    });

program.parse();
