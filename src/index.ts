import puppeteer, { Browser, Page } from 'puppeteer';
import express from 'express';
import * as path from 'path';
var cors = require('cors');


const fs = require("fs");
const PORT = 16301;

class LoadedGraph{
    constructor(name : string,graph : any){
        this.name = name;
        this.graph = graph;
    }
    name:string;
    graph:any;
}

let loadedGraphs : LoadedGraph[] = []; // graph to serve to PNP page

function setupExpress(){
    const app = express();
    app.use(cors());
    app.get('/graphs', (req,res) => {
        res.send(loadedGraphs.map(graph => graph.name));
    })
    loadedGraphs.forEach(graph => {
        app.get('/graphs/' + graph.name, (req, res) => {
            res.send(graph.graph);
        });
    })
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

function readLocalGraphs() {
    const dir = "graphs";
    const fileNames = fs.readdirSync(dir);

    for (const name of fileNames) {
        const filePath = path.join(dir, name);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        try {
            const graph = JSON.parse(fileContent);
            loadedGraphs.push({name: name.replaceAll(".ppgraph", ""), graph});
        } catch (error) {
            console.error(`Failed to parse file ${name} as JSON.`, error);
        }
    }
}


async function launchPNP(): Promise<void> {
    // Launch a new browser instance
    const browser: Browser = await puppeteer.launch({dumpio: true,
        args: ['--disable-web-security'],
        headless:false
    });

    // Open a new page for every graph

    loadedGraphs.forEach(async graph => {
        const page: Page = await browser.newPage();
        // Navigate to the desired website
        await page.goto(`file:///C:/Users/Tobias/Desktop/plug-and-play/dist/index.html?fetchLocalGraph=${graph.name}`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Take a screenshot
        await page.screenshot({ path: 'screenshot.png' });
        console.log("screenshot taken");
    });
	
    // Close the browser
    //await browser.close();
};

readLocalGraphs();
setupExpress(); 
launchPNP();



