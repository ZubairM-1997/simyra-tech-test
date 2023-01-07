import App from "./app";

export const app = new App();
app.initialize()
app.express.listen(4000, () => {
    console.log(`App listening on port ${4000}`)
})