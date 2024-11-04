import RecordsController from "./attio/Attio";
type Controller = typeof RecordsController;

const controllers = <Controller[]>[RecordsController];

export { controllers };
