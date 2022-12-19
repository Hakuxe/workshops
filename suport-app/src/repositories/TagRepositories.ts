import { AppDataSource } from "../../ormconfig";
import { Tag } from "../entities/Tag";

export const TagRepository = AppDataSource.getRepository(Tag);