import moment from "moment-timezone";

export default function convertToTimestampz(dateString: string) {
  const date = moment(dateString, "ddd MMM DD YYYY HH:mm:ss [GMT]Z (z)");

  const timestampz = date.tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DDTHH:mm:ssZ");

  return timestampz;
}
