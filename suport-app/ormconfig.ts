import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "sqlite",
    database:"src/database/mydb.sqlite"
   
})