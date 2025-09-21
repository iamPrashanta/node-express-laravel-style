const app = require("./bootstrap/app");

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Node server running on port ${PORT}`));
