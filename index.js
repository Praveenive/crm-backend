import dotenv from "dotenv";
import express from "express"
import { dbConnection } from "./db.js";
import { userRouter } from "./Routes/user.js";
import cors from "cors"
import { leadRouter } from "./Routes/leads.js";
import { isAuthenticated } from "./Controllers/auth.js";
import { employeerouter } from "./Routes/employee.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT

app.use(cors())
app.use(express.json());

dbConnection()

app.use("/user", userRouter)
app.use("/leads",isAuthenticated, leadRouter)
app.use("/emp",employeerouter )

app.listen(PORT,()=>console.log(`Server started ${PORT}`))
