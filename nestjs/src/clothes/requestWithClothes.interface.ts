import { Clothes } from "../typeorm";
import { Request } from "express";

interface RequestWithClothes extends Request {
    clothes: Clothes;
}
export default RequestWithClothes;