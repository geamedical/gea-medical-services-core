import BaseRepository from "./BaseRepository";
import Dept from "App/Models/Dept";

export default class DeptRepository extends BaseRepository {
    constructor() {
        super(Dept);
    }
}
