# สร้างระบบจองห้องประชุมด้วย Google Service

เนื่องจากว่า ปัจจุบันเราทำงานโดยใช้เครื่องมือต่างๆ เข้ามาทำให้ทำงานได้สะดวกมากยิ่งขึ้น ซึ่งเครื่องมือที่คนส่วนใหญ่รู้จักและใช้กับงานประเภท การนัดหมาย การเก็บข้อมูล แถมยังฟรีอีกด้วย ก็คือ service ของทาง Google แต่จะถามว่าสามารถใช้งานได้ครบตามที่เราต้องการท้ังหมดไหม ก็อาจจะไม่ หรือถ้าครบก็อาจจะต้องดัดแปลง กันนิดหน่อย ซึ่งบางครั้งมันก็ยากเกินไปสำหรับคนที่ไม่ได้ทำงานหรือมีความรู้ด้าน IT โอเค เกริ่นมาเยอะละ เริ่มเลยแล้วกัน

## จุดประสงค์ที่เกิน Project นี้ขึ้นมา
ก็เพราะว่า Google เองสามารถสร้าง form และบันทึกข้อมูลลงใน Google Sheet ได้ แถมยังสามารถนำข้อมูลที่บันทึกไปสร้างนัดหมายบน Google Calendar ได้อีกด้วย ทุกอย่างดูอัตโนมัติ สุดๆ ไปเลยใช่ไหม อ้าวแล้วถ้าเวลาที่จองไปมันซ้ำกันละ ใครตะไปรู้ละ ก็กด Submit ไปแล้วไม่เห็น Error เลย 555 ใช่นั่นแหละ เราทำให้ Error ณ ตอนที่กด Submit ที่หน้า Google Form ไม่ได้ แต่เราแจ้งเตือนเขาได้ (*เอาจริงๆ มันน่าจะทำได้แหละ เพียงแต่ผู้เขียนเอง ไม่ได้มีความสามารถด้านการเชียนโปรแกรม) ป่ะ!!! เริ่มกันเลย


## Google Service ที่ต้องใช้ (จะต้องสมัคร Account ก่อนเด้อ)##
- Google Form
- Google Sheet
- Google App Script
- Google Calendar

## เริ่ม ##
1. สร้าง Google Form
- ใส่รายละเอียดของ Google Form ตามที่ต้องการ

<img width="600" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/7971d9df-b258-402c-92db-0387d08e5565">


2. Link ไปที่ Google Sheet เพื่อบันทึกข้อมูลที่กรอกใน Google Form ลงใน Google Sheet

<img width="593" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/c134f21a-8226-47c3-88e5-b6d4a4d96484">

3. ทดสอบกรอกข้อมูลใน Google Form กด Submit แล้ว ตรวจสอบข้อมูลใน Google Sheet ว่าได้รับไหม

<img width="957" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/39277f4d-2f32-43f5-bafc-0f95a608029f">

4. Link การทำงานระหว่าง Google Sheet กับ Google App Script

4.1 เลือก Extensions แล้วเลือก Apps Script

<img width="487" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/ce6ea087-2419-4b89-b1df-033b157f93ab">

4.2 จริงๆ ตอนกดมาที่ Apps Script ครั้งแรกจะมีข้อมูลว่างๆ ให้ ประมาณนี้
```sh
function myfunction () {

}
```

ช่าย มันอ้างว้างมาก แต่ช่างมันเถอะ ไปต่อ

ให้ copy script ในไฟล์ meetingRoom.js ไปใส่ในไฟล์ Google App Script
- ในไฟล์นี้จะมีข้อมูลต้องแก้ไข ก่อนใช้งาน
1. Google Sheet ID
2. Google Calendar
3. Line Token
4. Email ผู้รับ Email

พอ copy มาแล้วหน้าตาก็จะประมาณนี้แหละ แต่ยังไม่เสร็จนะ ไล่ดู step ข้างล่างไปให้ครบ เพราะว่าเราต้องการให้แจ้งเตือนผ่านช่องทาง Line อีก 

<img width="1274" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/8cb39b23-6b18-4c67-a4f1-29193fc8d42f">

รูปด้านล่างนี้คือ Google Sheet ID
<img width="980" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/9bffca1e-91d2-4896-9803-91fd3a81f89c">

ชื่อของ Google Sheet ที่ต้องการหยิบข้อมูลไปใช้
<img width="275" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/8699b134-0d8c-4533-938f-183a01461a52">

ใส่ตรงนี้ และก็ใส่ชื่อ Sheet ที่มีข้อมูลด้วยเด้อที่ด้านหลัง ในตัวอย่างนี้จะชื่อ Time_Room
```sh
var mySpreadSheet = SpreadsheetApp.openById("1fGIURbOrnBaienF5Bbhmb0EzedG-8r3BWB").getSheetByName("Time_Room");
```

## สร้าง Calendar สำหรับ จองห้องประชุม

สร้าง Calendar ใหม่ แต่ถ้ามีอันที่ต้องการใช้อยู่แล้วข้ามไปเลยก็ได้

<img width="260" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/7e0f55a6-7515-4fb1-84b1-ff1043d41e15">

<img width="252" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/5c23b3d8-c8a6-410f-985c-3396a7e1e34d">

<img width="432" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/03c194c7-9e89-4ec1-9600-3d56550c3ef4">

<img width="432" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/5274fa91-8f63-4ebf-8a1a-29ea1f422b9f">

เมื่อได้ Calendar ที่ต้องการใช้มาแล้วก็ให้กดตรง kebab แล้วเลือก 'Setting and sharing' เอ้า!!! งงดิ kebab อะไรมันว่ะ มันคือสัญลักษณ์ไข่ปลาแนวตั้ง ฮ่าๆ ผมก็เคย งง มาเหมือนกัน ลองไป search หาคำว่า Bento Menu จะเป็นคำที่เขาใช้เรียกสัญลักษณ์บนหน้า web กัน

Calendar ที่จะใช้

<img width="238" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/c4d769c2-78c7-447e-af15-cd26e166d523">

เลือก Setting and Sharing

<img width="187" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/9485ae9d-2461-4e5c-8fca-beec89351a59">

Calendar ID เอาไปใส่ในไฟล์ meetingRoom.js

<img width="1077" alt="image" src="https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/10da0e84-fee1-47af-a10d-91d3ddb68ae6">

```sh
var calendar = CalendarApp.getCalendarById("115ab18f7134ed0400d18b94927cff30cd881274c66d@group.calendar.google.com");
```

## LINE TOKEN ##
มาสร้าง LINE TOKEN กัน ต้องสร้างนะ ไม่งั้นจะใช้งานไม่ได้ เพราะจะให้ใครก็ไม่รู้มาแจ้งเตือนใน LINE ของเรามั่วๆ ไม่ได้ เพราะงั้นก็ต้องใช้ TOKEN นี่แหละ เพื่อเป็นการยืนยันว่ามีสิทธิ์การแจ้งเตือนได้

1. เปิด web browser(Chrome , Firefox , Safari) ขึ้นมาแล้วเข้าไปที่ Link ด้านล่างนี้

URL : https://notify-bot.line.me/th/

2. Login ด้วย Line ID ของเราเอง หรือ ของ Account กลางถ้ามี

![image](https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/189a5b68-258e-43f4-97f0-b1a38f2e4fc6)

3. เข้าไปที่หน้า Page

![image](https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/3ababaf5-e0ca-4072-92b6-81c8fa17c34f)

4. สร้าง Token สำหรับนำไปใช้งาน

![image](https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/bc6c7147-fca7-4f2f-b3f9-4c2ebb67e38f)

5. สามารถตั้งชื่อเพื่อให้รู้ว่าอันนี้เป็น Token ที่ใช้งานกับอะไร และเลือก Token ที่จะนำไปใช้งานกับกลุ่มที่ต้องการให้แจ้งเตือน

![image](https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/2c3cf176-9b78-4ff3-b454-6e101505b898)

6. จะได้ Token มาให้ copy เก็บไว้เลย เพราะจะเข้ามาดูอีกไม่ได้แล้วแสดงแค่ครั้งแรก ครั้งเดียว

![image](https://github.com/mothkim/meeting-room-with-google-service/assets/105619969/db905874-ff61-454e-aab2-a27c11c49930)

เอา LINE Token ที่ได้ไปใส่ใน App Script

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

