import BaseRepository from "../BaseRepository";
import Dept from "App/Models/Master-data/Dept";

export default class DeptRepository extends BaseRepository {
    constructor() {
        super(Dept);
    }
}
