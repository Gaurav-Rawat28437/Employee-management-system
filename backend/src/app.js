const express=require("express")
const cors=require("cors")
const { employeeRouter } = require("./routes/employee.route")
require("dotenv").config()
const app=express()




app.use(cors({
    origin:[process.env.FE_URL,"http://localhost:5173","http://localhost:5174","http://localhost:5175"],
    credentials: true
}))

app.use(express.json())

app.get("/",(req,res)=>{
    try{
        res.json({
            msg:"all good"
        })
    }
    catch(error){
        console.log(error)
        res.json({
            msg:error.message,
            error:error
        })
    }
})


app.use("/api",employeeRouter)

app.use((req,res)=>{
    res.status(400).json({
        error:"api not found,this api is not a part of server"
    })
})


module.exports=app