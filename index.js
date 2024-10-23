import express, { query } from "express";
import bodyParser from "body-parser";
import fs from 'fs';


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("register.ejs");
});

app.post("/register", (req, res) => {
    const body = req.body;

    const userInfo = {
        name: body.name,
        email: body.email,
        password: body.passsword,
        phone: body.phone,
        address: body.address
    }

    const usersPath='users.json';
    fs.readFile(usersPath, 'utf8', (err, data) => {
        if (err) {
            console.log("error reading file:");
            console.log(err);
        } else {
            let userData = JSON.parse(data);
            userData.push(userInfo);
            // console.log(userData)   ;
            // userData.push(userInfo);
        
            fs.writeFile(usersPath, JSON.stringify(userData), (err) => {
                if (err) {
                console.log(err);
                }
            });
        }
    });

    res.send("Registered successfully!");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});