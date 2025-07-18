# 📸 Image Frontend (React + Tailwind  + MUI (Material UI) )

A simple React app to browse and filter photographers by city, price, rating, and style.

---

## 🔧 Setup Instructions

```bash
# Clone the frontend repo
git clone
 https://github.com/my-suraj5656/photowebapp-task.git
cd photowebapp-task

# Install dependencies
npm install

# Start development server
npm run dev
```

Runs at: [http://localhost:5173]

---

## 🔌 JSON Server Setup (Mock API)

Separate backend repo:  
[https://github.com/my-suraj5656/json-photo-data]

Steps:

```bash
cd json-photo-data
npm install
npm start
```

API endpoint: `https://json-photo-data-1.onrender.com`

---

## 🔍 Filtering, Debounce, and Logic Notes

- **Filtering**:  
  - Price range slider  
  - City dropdown  
  - Rating (e.g., 4+, 3+)  
  - Styles (checkboxes)  
  - All filters update results dynamically

- **Sorting**:  
  - Price: Low → High  
  - Rating: High → Low  
  - Recently Added

- **Search with Debounce**:  
  - Input is debounced by `400ms` to avoid frequent re-renders  
  - Supports fuzzy search on name, location, tags  

```js
useEffect(() => {
  const timer = setTimeout(() => {
    dispatch(applySearch(searchTerm));
  }, 400);
  return () => clearTimeout(timer);
}, [searchTerm]);
```

- **Pagination**:  
  - Load more button to fetch additional results

---

## ✅ Tech Stack

- React + Vite  
- Tailwind CSS 
- MUI (Material UI)
- Redux Toolkit  
- JSON Server (Mock API)

---

## 👨‍💻 Author

Made by **Suraj Prasad**  
GitHub: [https://github.com/my-suraj5656]
