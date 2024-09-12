import dayjs from "dayjs";

export function _formatNumber(input: any) {
  const value = String(input).replace(/[^0-9.-]/g, "");
  
  const number = Number(value);

  if (!isNaN(number)) {
    const formattedNumber = number.toFixed(2);
    return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
  } else {
    return "";
  }
}

export function _formatNumberNotdecimal(input: any) {
  const value = String(input).replace(/[^0-9.]/g, "");

  const number = parseFloat(value);

  if (!isNaN(number)) {
    return number.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  } else {
    return "";
  }
}

export function removeCommas(input: any) {
  if (typeof input === 'string') {
    // ใช้ replace() เพื่อลบเครื่องหมายจุลภาค (,) ทั้งหมดออกจากข้อความ
    return input.replace(/,/g, "");
  } else {
    return input;
  }

}

export function stringWithCommas(input: any) {

  
  const stringWithoutCommas = input.replace(/,/g, ""); // Remove commas
  const numberValue = parseInt(stringWithoutCommas, 10);
  if (!isNaN(numberValue)) {
    // Format the number with commas
    return numberValue;
  } else {
    // If the input is not a valid number, clear the input field
    return "";
  }
}


export const dateFormatSlashReturnMUI = (date: any) => {
  // data DD/MM/YYYY
  if (date == null) {
    return null;
  }
  try {
    const newdate = dayjs(date, "DD/MM/YYYY");
    return newdate;
  } catch {
    return null;
  }
};

type Format = "DD/MM/YYYY" | "DD/MM/YYYY HH:mm:ss" | "YYYY/MM/DD" | "YYYY-MM-DD" | "YYYY-MM-DD HH:mm:ss" | "YYYY-MM-DD HH:mm:ss:SSS";

export const dateFormatTime = (date: any, format: Format) => {
  if (date == null) {
    return "";
  }
  try {
    const newdate = dayjs(date)
    return dayjs(newdate).format(format);
  } catch {
    return "";
  }

};
export const dateFormatTimeTH = (date: any, format: Format) => {
  if (date == null) {
    return "";
  }
  try {
    let newdate = dayjs(date)
    newdate = newdate.add(543, 'year');
    return dayjs(newdate).format(format);
  } catch {
    return "";
  }

};
export const dateFormatTimeEN = (date: any, format: Format) => {
  if (date == null) {
    return "";
  }
  try {
    let newdate = dayjs(date)
    return dayjs(newdate).format(format);
  } catch {
    return "";
  }

};

export const DateToDB = (date: any): string => {
  if (!date) {
    return "";  // คืนค่าว่างถ้า date เป็น null หรือ undefined
  }
  try {
    const newDate = new Date(date);

    // คำนวณการเลื่อนเวลาเป็น UTC+7 (ประเทศไทย)
    const timezoneOffset = newDate.getTimezoneOffset(); // Time zone ของระบบ (UTC) เป็นนาที
    const adjustedDate = new Date(newDate.getTime() - timezoneOffset * 60000); // ปรับเวลาให้ตรงกับ Time Zone ที่ต้องการ

    return adjustedDate.toISOString().replace("Z", "+07:00"); // เพิ่ม +07:00 แทนการใช้ Z (UTC)
  } catch (error) {
    console.error("Invalid date format:", error);
    return ""; // คืนค่าว่างถ้ามีข้อผิดพลาดในการแปลง
  }
};

