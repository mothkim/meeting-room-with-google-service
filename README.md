# สร้างระบบจองห้องประชุมด้วย Google Service

## Google Service ที่ต้องใช้ ##
- Google Form
- Google Sheet
- Google App Script
- Google Calendar

## เริ่ม ##
1. สร้าง Google Form
- ใส่รายละเอียดของ Google Form ตามที่ต้องการ
2. Link ไปที่ Google Sheet เพื่อบันทึกข้อมูลที่กรอกใน Google Form ลงใน Google Sheet
- ทดสอบกรอกข้อมูลใน Google Form แล้วกด Submit แล้ว ตรวจสอบข้อมูลใน Google Sheet ว่าได้รับไหม
3. Link การทำงานระหว่าง Google Sheet กับ Google App Script
- ให้ copy script ในไฟล์ meetingRoom.js ไปใส่ในไฟล์ Google App Script
- ในไฟล์นี้จะมีข้อมูลต้องแก้ไข ก่อนใช้งาน
    > Google Sheet ID
    > Google Calendar
    > Line Token (*อันนี้กรณีที่เราต้องการให้ส่ง แจ้งเตือนเวลาที่จองห้องประชุมแล้วซ้ำ)
    > Email ผู้รับ Email