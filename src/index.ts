import puppeteer, { Browser, Page } from 'puppeteer';
import express from 'express';
const fs = require("fs");
const PORT = 16301;

let loadedGraph : any = undefined; // graph to serve to PNP page

function setupExpress(){
    const app = express();
    app.get('/loadedGraph', (req, res) => {
        res.send(loadedGraph);
    });
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

function readLocalFile() {
    const rawFile = fs.readFileSync("graph.ppgraph", "utf8");
    loadedGraph = JSON.parse(rawFile);
    console.log(rawFile);
}


async function launchPNP(): Promise<void> {
    // Launch a new browser instance
    const browser: Browser = await puppeteer.launch();

    // Open a new page
    const page: Page = await browser.newPage();

    // Navigate to the desired website
    await page.goto('C:\\Users\\Tobias\\Desktop\\pnp-headless\\dist\\index.html?fetchLocalGraph');

	await new Promise(resolve => setTimeout(resolve, 2000));

    // Take a screenshot
    await page.screenshot({ path: 'screenshot.png' });
	

    // Close the browser
    await browser.close();
};

readLocalFile();
setupExpress(); 
launchPNP();



