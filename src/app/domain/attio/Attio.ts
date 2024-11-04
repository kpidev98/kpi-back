import { JsonController, Put, Body } from "routing-controllers";
import attio from "@api/attio";
import { TFormDataValues } from "./Attio.types";
const ATTIO_KEY = process.env.ATTIO_API_KEY;
@JsonController("/records")
export default class RecordsController {
  constructor() {
    attio.auth(`${ATTIO_KEY}`);
  }
  @Put()
  async setRecords(@Body() body: TFormDataValues) {
    try {
      const { name, email_addresses, phone_numbers } = body;
      const dataToSend = {
        data: {
          values: {
            name: name ? [name] : [],
            email_addresses: [email_addresses],
            phone_numbers: phone_numbers ? [phone_numbers] : [],
          },
        },
      };

      const { data } = await attio.putV2ObjectsObjectRecords(dataToSend, {
        matching_attribute: "email_addresses",
        object: "people",
      });

      console.log("Response data:", data);
      return { success: true, data };
    } catch (err) {
      console.error("Error updating records:", err);
      return { success: false, message: "Error updating records" };
    }
  }
}
