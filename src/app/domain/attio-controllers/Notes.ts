import { JsonController, Post, Body } from "routing-controllers";
import attio from "@api/attio";
const ATTIO_KEY = process.env.ATTIO_API_KEY;
if (!ATTIO_KEY) throw new Error("ATTIO_API_KEY is missing.");
@JsonController("/notes")
export default class NotesController {
  constructor() {
    attio.auth(`${ATTIO_KEY}`);
  }
  @Post()
  async createNote(
    @Body()
    noteData: {
      recordId: string;
      title: string;
      content: string;
      created_at: string;
    }
  ) {
    try {
      const { recordId, title, content, created_at } = noteData;
      const response = await attio.postV2Notes({
        data: {
          parent_object: "people",
          parent_record_id: recordId,
          title,
          format: "plaintext",
          content,
          created_at,
        },
      });

      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error creating note:", error);
      return { success: false, message: "Error creating note" };
    }
  }
}
