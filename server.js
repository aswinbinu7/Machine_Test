require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const Category = mongoose.model("Category", CategorySchema);

const MenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: { type: Number, required: true },
});

const Menu = mongoose.model("Menu", MenuSchema);

app.post("/categories", async (req, res) => {
  const { name } = req.body;
  if (!name)
    return res.status(400).json({ error: "Category name is required" });

  try {
    const category = new Category({ name });
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Error creating category" });
  }
});

app.get("/categories", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

app.post("/menus", async (req, res) => {
  const { name, description, categoryId, price } = req.body;
  if (!categoryId)
    return res.status(400).json({ error: "Category is required" });

  try {
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ error: "Category not found" });

    const menu = new Menu({ name, description, category: categoryId, price });
    await menu.save();
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: "Error creating menu item" });
  }
});

app.get("/menus", async (req, res) => {
  const { categoryId } = req.query;
  const filter = categoryId ? { category: categoryId } : {};

  try {
    const menus = await Menu.find(filter).populate("category", "name");
    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: "Error fetching menus" });
  }
});

app.get("/menus/:menuId", async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.menuId).populate(
      "category",
      "name"
    );
    if (!menu) return res.status(404).json({ error: "Menu not found" });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: "Error fetching menu item" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
