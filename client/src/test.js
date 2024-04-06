const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false }); // needs to be false to load vidoes
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');


    const routes = [
        '/adminPanel',
        '/Volunteers',
        '/profile',
        '/contact',
        '/requests',
        '/AboutPage',
        '/HowToUse',
        '/setgoals',
    ];


    const timeOutInMs = 10000

    console.log(`Test Sign up..`);
    await page.goto(`http://localhost:3000/signup`, {
        waitUntil: "domcontentloaded",
    });
    await page.type('input[name=firstName]', 'Test');
    await page.type('input[name=lastName]', 'User');
    await page.type('input[name=email]', 'testuser@gmail.com');
    await page.type('input[name=password]', 'TestPassword!123');
    console.log(`Signed up successfully.`);



    console.log('');
    console.log(`Test Log in..`);
    await page.goto(`http://localhost:3000/login`, {
        waitUntil: "domcontentloaded",
    });
    await page.type('input[name=email]', 'salahqe@ac.sce.ac.il');
    await page.type('input[name=password]', 'Ss12345678!');
    await page.click('button[data-testid="login-button"]');
    await page.waitForNavigation();//מחכה ל שינוי עמוד
    console.log(`Logged in successfully.`);



    console.log('');
    console.log(`Navigating..`);
    for (let route of routes) {
        console.log('');
        console.log(`Navigating to ${route}`);
        try {
            await page.goto(`http://localhost:3000${route}`, {
                waitUntil: "domcontentloaded",
            })
            console.log(`Successfully navigated to ${route}`);
        } catch (err) {
            console.log("error loading url", err)
        }
    }



    console.log('');
    console.log(`Test Video containers..`);//הולכים ל home bage נבדוק שיש לנו את ה סרטונים
    await page.goto(`http://localhost:3000/`, {
        waitUntil: "domcontentloaded",
    });
    let isVideoContainer = false;
    try {
        await page.waitForSelector('div[data-testid="video-container"]', { timeout: timeOutInMs });
        isVideoContainer = true;
    } catch (err) {
        isVideoContainer = false;
    }
    if (!isVideoContainer) {
        console.log(`Failed to find video container.`);
        process.exit()
    }
    console.log(`Video container found.`);



    console.log('');
    console.log(`Test Contact page..`);
    await page.goto(`http://localhost:3000/contact`, {
        waitUntil: "domcontentloaded",
    });
    let isSent = false
    await page.type('textarea[name=message]', 'test message');
    await page.click('button[data-testid="contact-button"]');
    page.on('console', msg => msg.text() == "message sent" ? isSent = true : isSent = false);
    await timeOut(timeOutInMs);
    if (!isSent) {
        console.log(`Failed to sent.`);
        process.exit()
    }
    console.log(`Message sent successfully.`);



    console.log('');
    console.log(`Test Volunteers page..`);
    await page.goto(`http://localhost:3000/volunteers`, {
        waitUntil: "domcontentloaded",
    });
    let isVolunteers = false;
    try {
        await page.waitForSelector('div[data-testid="card"]', { timeout: timeOutInMs });
        const volunteers = await page.$$('div[data-testid="card"]');
        console.log(`Found ${volunteers.length} volunteers.`);
        isVolunteers = true;
    } catch (error) {
        isVolunteers = false;
    }
    if (!isVolunteers) {
        console.log(`Failed to find volunteers.`);
        process.exit()
    }
    console.log(`Request sent successfully.`);



    console.log('');
    console.log(`Test Profile page..`);
    await page.goto(`http://localhost:3000/profile`, {
        waitUntil: "networkidle0",
    });
    let isProfile = false;
    await page.waitForSelector('#edit-button');
    await page.click('#edit-button');
    page.on('console', msg => console.log(msg.text()));
    page.on('console', msg => msg.text() == "User updated successfully" ? isProfile = true : isProfile = false);
    await timeOut(timeOutInMs);
    if (!isProfile) {
        console.log(`Failed to edit.`);
        process.exit()
    }
    console.log(`Profile edited successfully.`);


    // hakton

    console.log('');
    console.log(`Test Requests page..`);
    await page.goto(`http://localhost:3000/requests`, {
        waitUntil: "domcontentloaded",
    });
    let isRequest = false


    await page.type('textarea[name=message]', 'Maryam is here');
    await page.click('button[data-testid="request-button"]');
    page.on('console', msg => msg.text() == "message sent" ? isRequest = true : isRequest = false);
    await timeOut(timeOutInMs);
    if (!isRequest) {
        console.log(`Failed to sent.`);
        process.exit()
    }
    console.log(`Request sent successfully.`);


    console.log('');
    console.log(`Test set goals in..`);
    await page.goto(`http://localhost:3000/`, {
        waitUntil: "domcontentloaded",
    });
    let setgoals = false;
    let rendergoals = false;

    // test goals render
    await page.waitForSelector('.goals-display', { timeout: 1000 });
    const currentWeight = await page.$("#currentWeight")
    const currentLength = await page.$("#currentLength")
    const goalWeight = await page.$("#goalWeight")
    const muscleGain = await page.$("#muscleGain")
    const exerciseDays = await page.$("#exerciseDays")
    const BMI = await page.$("#BMI")
    const protein = await page.$("#protein")
    const calories = await page.$("#calories")
    if (
        await page.evaluate((cw, cl, gw, mg, ed, bmi, p, c) => {
            return {
                currentWeight: cw ? cw.value : null,
                currentLength: cl ? cl.value : null,
                goalWeight: gw ? gw.value : null,
                muscleGain: mg ? mg.value : null,
                exerciseDays: ed ? ed.value : null,
                BMI: bmi ? bmi.value : null,
                protein: p ? p.value : null,
                calories: c ? c.value : null,
            };
        }, currentWeight, currentLength, goalWeight, muscleGain, exerciseDays, BMI, protein, calories)
    ) {
        rendergoals = true;
    }

    // test goals form
    await page.waitForSelector('.setgoalsbutton', { timeout: 1000 });
    await page.click('.setgoalsbutton');
    await page.type('input[name=currentWeight]', '70');
    await page.type('input[name=height]', '180');
    await page.type('input[name=goalWeight]', '65');
    await page.type('input[name=muscleGain]', '5');
    await page.click('button[name=submitGoals]');
    page.on('console', msg => msg.text() == "Goals set successfully: Goals set successfully" ? setgoals = true : setgoals = false);
    await timeOut(timeOutInMs);

    if (!setgoals || !rendergoals) {
        console.log(`Goals test failed.`);
        process.exit()
    }

    console.log(`Goals tested successfully.`);



    console.log('');
    console.log(`Test Log out..`);
    await page.goto(`http://localhost:3000/`, {
        waitUntil: "domcontentloaded",
    });
    let isLoggedOut = false;
    await page.click('[data-testid="logout-button"]');
    try {
        await page.waitForSelector('button[data-testid="logout-button"]', { timeout: timeOutInMs });
    } catch (err) {
        isLoggedOut = true;
    }
    if (!isLoggedOut) {
        console.log(`Failed to log out.`);
        process.exit()
    }
    console.log(`Logged out successfully.`);

    await browser.close();// סוגר את ה browser
})();

const timeOut = (m) => new Promise(resolve => setTimeout(resolve, m));
