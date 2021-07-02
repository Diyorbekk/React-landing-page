import {database} from "./firebase";

const db = database.ref("/category")

class CategoryDataService {
    getAll() {
        return db;
    }

    create(projects) {
        return db.push(projects);
    }

    update(key, value) {
        return db.child(key).update(value);
    }

    delete(key) {
        return db.child(key).remove();
    }

    deleteAll() {
        return db.remove();
    }
}


export default new CategoryDataService();