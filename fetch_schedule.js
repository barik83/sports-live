const fs = require('fs');

// উদাহরণস্বরূপ একটি ফ্রি স্পোর্টস API
const API_URL = 'https://api.biren.xyz/sports/schedule'; 

async function updateSchedule() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        // ডেটা ফাইল হিসেবে সেভ করা
        fs.writeFileSync('schedule.json', JSON.stringify(data, null, 2));
        console.log('Schedule updated successfully!');
    } catch (error) {
        console.error('Error fetching schedule:', error);
        // এপিআই কাজ না করলে একটি ডিফল্ট ব্যাকআপ সময়সূচী তৈরি হবে
        const backupData = [
            { match: "Bangladesh vs Australia", time: "08:00 PM", status: "Live" },
            { match: "India vs Pakistan", time: "03:30 PM", status: "Upcoming" }
        ];
        fs.writeFileSync('schedule.json', JSON.stringify(backupData, null, 2));
    }
}

updateSchedule();
