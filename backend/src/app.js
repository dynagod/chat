import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/api/users", (req, res) => {
    const users = [
        {
            id: 1,
            name: "ayush",
            admin: true,
        },
        {
            id: 2,
            name: "aditya",
            admin: false,
        },
        {
            id: 3,
            name: "ashmit",
            admin: false,
        },
        {
            id: 4,
            name: "aman",
            admin: false,
        },
        {
            id: 5,
            name: "shubh",
            admin: false,
        }
    ];
    res.json(users);
});

export { app }