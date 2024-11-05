import { JsonController, Put, Body } from "routing-controllers";
import attio from "@api/attio";
import { TFormDataValuesRecords } from "./Attio.types";
import NotesController from "./Notes";
const ATTIO_KEY = process.env.ATTIO_API_KEY;
const OWNER = process.env.OWNER_EMAIL;

if (!ATTIO_KEY) throw new Error("ATTIO_API_KEY is missing.");
if (!OWNER) throw new Error("OWNER_EMAIL is missing.");

@JsonController("/records")
export default class RecordsController {
  private notesController = new NotesController();
  constructor() {
    attio.auth(`${ATTIO_KEY}`);
  }

  @Put()
  async setRecordsAndList(@Body() body: TFormDataValuesRecords) {
    try {
      const { name, email, phone, message } = body;
      const dataToSend = {
        data: {
          values: {
            name: name ? [name] : [],
            email_addresses: [email],
            phone_numbers: phone ? [phone] : [],
          },
        },
      };

      const { data: recordData } = await attio.putV2ObjectsObjectRecords(
        dataToSend,
        {
          matching_attribute: "email_addresses",
          object: "people",
        }
      );

      const recordId = recordData?.data?.id?.record_id;
      if (!recordId) {
        return { success: false, message: "Failed to retrieve record ID" };
      }

      await attio.putV2ListsListEntries(
        {
          data: {
            parent_record_id: recordId,
            parent_object: "people",
            entry_values: {
              owner: OWNER ? [OWNER] : [],
            },
          },
        },
        { list: "sales_3" }
      );
      const noteData = {
        recordId: recordId,
        title: "New record created",
        content: `Message: ${message}`,
        created_at: new Date().toISOString(),
      };
      const noteResponse = await this.notesController.createNote(noteData);

      return { success: true, recordData };
    } catch (err) {
      console.error("Error updating records:", err);
      return { success: false, message: "Error updating records" };
    }
  }
}
