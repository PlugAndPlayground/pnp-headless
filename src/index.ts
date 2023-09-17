import puppeteer, { Browser, Page } from 'puppeteer';
import express from 'express';
var cors = require('cors');

const fs = require("fs");
const PORT = 16301;

let loadedGraphs : any[] = undefined; // graph to serve to PNP page

function setupExpress(){
    const app = express();
    app.use(cors());
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
}


async function launchPNP(): Promise<void> {
    // Launch a new browser instance
    const browser: Browser = await puppeteer.launch({dumpio: true,
        args: ['--disable-web-security'],
        headless:"new"
    });

    // Open a new page
    const page: Page = await browser.newPage();

    // Navigate to the desired website
    await page.goto('file:///C:/Users/Tobias/Desktop/plug-and-play/dist/index.html');

	await new Promise(resolve => setTimeout(resolve, 5000));

    // Take a screenshot
    await page.screenshot({ path: 'screenshot.png' });
    console.log("screenshot taken");
	

    // Close the browser
    //await browser.close();
};

readLocalFile();
setupExpress(); 
launchPNP();



