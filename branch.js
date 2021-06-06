const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
    headless:false,
});
    const page = await browser.newPage();
    await page.setViewport({
        width: 1440,
        height: 900,
    });
    await page.goto('https://brunch.co.kr/search');
    await page.click('input.txt_search');
    await page.keyboard.type('Hello World');
    await page.keyboard.press("Enter");

    await page.waitForNavigation();
    let infiniteScrollInterval = setInterval(async() => {
        await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight);
        });
    }, 5000);
    setTimeout(async() => {
        clearInterval(infiniteScrollInterval);
        console.log("done");
        await browser.close();
    },1000*10)

    //검색 완료
    //마우스 스크롤을 해서 앞으로 내린다.
    // 키보드 화살표 아래를 눌러서 화면을 아래로 내린다.
    // => 무한 스크롤 게시글 데이터가 들어오지 않을까?
})();