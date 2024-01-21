# สร้างระบบจองห้องประชุมด้วย Google Service

## Google Service ที่ต้องใช้ ##
- Google Form
- Google Sheet
- Google App Script
- Google Calendar

- ในไฟล์นี้จะมีข้อมูลต้องแก้ไข ก่อนใช้งาน
    > Google Sheet ID
    > Google Calendar
    > Line Token (*อันนี้กรณีที่เราต้องการให้ส่ง แจ้งเตือนเวลาที่จองห้องประชุมแล้วซ้ำ)
    > Email ผู้รับ Email

## เริ่ม ##
1. สร้าง Google Form
- ใส่รายละเอียดของ Google Form ตามที่ต้องการ

<img width="600" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/7971d9df-b258-402c-92db-0387d08e5565">


2. Link ไปที่ Google Sheet เพื่อบันทึกข้อมูลที่กรอกใน Google Form ลงใน Google Sheet
- ทดสอบกรอกข้อมูลใน Google Form แล้วกด Submit แล้ว ตรวจสอบข้อมูลใน Google Sheet ว่าได้รับไหม

<img width="957" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/39277f4d-2f32-43f5-bafc-0f95a608029f">


<img width="593" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/c134f21a-8226-47c3-88e5-b6d4a4d96484">

3. Link การทำงานระหว่าง Google Sheet กับ Google App Script
- ให้ copy script ในไฟล์ meetingRoom.js ไปใส่ในไฟล์ Google App Script

<img width="487" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/ce6ea087-2419-4b89-b1df-033b157f93ab">

<img width="1274" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/8cb39b23-6b18-4c67-a4f1-29193fc8d42f">

<img width="980" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/9bffca1e-91d2-4896-9803-91fd3a81f89c">

<img width="275" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/8699b134-0d8c-4533-938f-183a01461a52">

## สร้าง Calendar สำหรับ จองห้องประชุม

<img width="260" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/7e0f55a6-7515-4fb1-84b1-ff1043d41e15">

<img width="252" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/5c23b3d8-c8a6-410f-985c-3396a7e1e34d">

<img width="432" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/03c194c7-9e89-4ec1-9600-3d56550c3ef4">

<img width="432" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/5274fa91-8f63-4ebf-8a1a-29ea1f422b9f">

<img width="238" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/c4d769c2-78c7-447e-af15-cd26e166d523">

<img width="187" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/9485ae9d-2461-4e5c-8fca-beec89351a59">

<img width="1077" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/10da0e84-fee1-47af-a10d-91d3ddb68ae6">

## LINE TOKEN ##

URL : https://notify-bot.line.me/th/

![image](https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/189a5b68-258e-43f4-97f0-b1a38f2e4fc6)

![image](https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/2469cbae-46f7-4ed0-853f-499a2232f98d)

![image](https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/3ababaf5-e0ca-4072-92b6-81c8fa17c34f)

![image](https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/bc6c7147-fca7-4f2f-b3f9-4c2ebb67e38f)

![image](https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/2c3cf176-9b78-4ff3-b454-6e101505b898)

จะได้ Token มาให้ copy เก็บไว้เลย เพราะจะเข้ามาดูอีกไม่ได้แล้วแสดงแค่ครั้งแรก ครั้งเดียว

![image](https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/db905874-ff61-454e-aab2-a27c11c49930)

เอา LINE Token ที่ได้ไปใสาใน App Script

ตัวอย่าง
```sh
var token = "qkpppc2SbKWb0iXCr9UYCI5OQpz3AqUmUmmbFKn6A2w";
```

## Email ผู้รับ ##

ส่งแบบ E-mail ผู้รับ 1 คน 
```sh
MailApp.sendEmail({
    to: "e-mail-1@gmail.com",
    subject: "จองห้องประชุมไม่สำเร็จ",
    htmlBody: "คุณ" + name + "ไม่สามารถจอง" + roomNumber + "ได้ เนื่องจากมีผู้จองช่วงเวลานี้ไปแล้ว <br>" +
              "กรุณาจองห้องประชุมใหม่อีกครั้ง"
});
```

ส่งแบบ E-mail ผู้รับมากกว่า 1 คน 
```sh
MailApp.sendEmail({
    to: "e-mail-1@gmail.com, e-mail-2@gmail.com",
    subject: "จองห้องประชุมไม่สำเร็จ",
    htmlBody: "คุณ" + name + "ไม่สามารถจอง" + roomNumber + "ได้ เนื่องจากมีผู้จองช่วงเวลานี้ไปแล้ว <br>" +
              "กรุณาจองห้องประชุมใหม่อีกครั้ง"
});
```
