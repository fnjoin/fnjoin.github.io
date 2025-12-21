#!/usr/bin/env node

import main from "./index.js";

main()
    .then(() => {
        console.log("Process completed without error.");
    })
    .catch((err) => console.error("There was an error", err));
