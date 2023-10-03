import { Closet } from "./closet.entity";
import { Clothes } from "./clothes.entity";
import DatabaseFile from "./databaseFile.entity";
import { Outfit } from "./outfit.entity";
import { User } from "./user.entity";

export {};

const entities = [User, Clothes, Closet, Outfit, DatabaseFile];
export {User, Clothes, Closet, Outfit, DatabaseFile};
export default entities;