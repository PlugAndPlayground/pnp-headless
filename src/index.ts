import puppeteer, { Browser, Page } from 'puppeteer';
import express from 'express';
const PORT = 16301;

const app = express();
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


(async (): Promise<void> => {
    // Launch a new browser instance
    const browser: Browser = await puppeteer.launch();

    // Open a new page
    const page: Page = await browser.newPage();

    // Navigate to the desired website
    await page.goto('https://plugandplayground.dev');

	await new Promise(resolve => setTimeout(resolve, 2000));

    // Take a screenshot
    await page.screenshot({ path: 'screenshot.png' });
	

    // Close the browser
    await browser.close();
})();
