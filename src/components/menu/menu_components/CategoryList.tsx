import styled from "styled-components";
import bgImage from "../../../assets/categoryListBg.png";
import axios from "axios";
import { useEffect, useState } from "react";
import MenuItemsHeader from "../menu_items/MenuItemsHeader";

interface CategoryModel {
  _id: string;
  name: string;
}

export default function CategoryList() {
  const [categoryData, setCategoryData] = useState<CategoryModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get<CategoryModel[]>("http://localhost:8000/categories")
      .then((response) => {
        setCategoryData(response.data);
        if (response.data.length > 0 && !selectedCategory) {
          setSelectedCategory(response.data[0]._id);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };

  const handleCategoryClick = (id: string) => {
    setSelectedCategory(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return alert("Please enter a category name!");

    try {
      await axios.post("http://localhost:8000/categories", {
        name: newCategory,
      });
      setNewCategory("");
      setIsAdding(false);
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <>
      <SC_CategoryListComponent bgImage={bgImage}>
        <div className="categoryList">
          {categoryData.map((item) => (
            <SC_CategoryButton
              key={item._id}
              isSelected={selectedCategory === item._id}
              onClick={() => handleCategoryClick(item._id)}
            >
              {item.name}
            </SC_CategoryButton>
          ))}

          {/*Add Category Button */}
          {!isAdding ? (
            <SC_AddButton onClick={() => setIsAdding(true)}>+</SC_AddButton>
          ) : (
            <SC_AddCategoryForm onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="New category..."
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                autoFocus
              />
              <button type="submit">✔</button>
              <button type="button" onClick={() => setIsAdding(false)}>
                ✖
              </button>
            </SC_AddCategoryForm>
          )}
        </div>
      </SC_CategoryListComponent>

      {/*Pass selectedCategory to MenuItemsHeader */}
      {selectedCategory && (
        <MenuItemsHeader selectedCategory={selectedCategory} />
      )}
    </>
  );
}

const SC_CategoryListComponent = styled.div<{ bgImage: string }>`
  display: flex;
  height: 3em;
  background-image: url(${(props) => props.bgImage});
  .categoryList {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 0.5em;
    align-items: center;
  }
`;

const SC_CategoryButton = styled.button<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? "#0796ef" : "black")};
  border: 0.5px solid #0796ef;
  padding: 5px 10px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const SC_AddButton = styled.button`
  background-color: #0796ef;
  color: white;
  border: none;
  font-size: 18px;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SC_AddCategoryForm = styled.form`
  display: flex;
  align-items: center;
  gap: 5px;

  input {
    padding: 5px;
    border: 1px solid #0796ef;
    border-radius: 4px;
    width: 120px;
  }

  button {
    background-color: #0796ef;
    color: white;
    padding: 5px;
    border: none;
    cursor: pointer;
  }
`;
