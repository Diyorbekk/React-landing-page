import axios from "axios";

export default axios.create({
    baseURL: "https://architecture-e3d35-default-rtdb.firebaseio.com/"
})