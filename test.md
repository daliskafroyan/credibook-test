### **Overview**
You are tasked with developing a **frontend interface** for a **Product Description Section**. This section will allow users to input product details, manage categories, and upload images. The interface should be dynamic, user-friendly, and responsive. Below are the detailed objectives, requirements, and design guidelines.

---

### 🎯 **Objective**
Create a **Product Description Section** that enables users to:
1. Add and manage a **dynamic list of products** (up to 5 products).
2. Add and manage **categories** for each product (up to 3 categories per product).
3. Upload and manage **images or attachments** for each product category.

---

### 📚 **Requirements**

#### **1. Dynamic Product List**
- **Features**:
  - Users can add multiple products using a **dynamic list table**.
  - Each product has a **name field** where users can type the product name.
  - Users can add products by clicking a **"+" icon**.
  - Each product entry has an **auto-incremented number**.
  - Users can delete a product entry using an **"x icon"**, and the numbering adjusts automatically.
  - The maximum number of products is **5**. After reaching the limit:
    - The **"+" icon** should be hidden.
    - A notification should appear: **"Anda Sudah Mencapai Maksimum Input"**.

#### **2. Product Categories**
- **Features**:
  - Users can add up to **3 categories** for each product.
  - Categories can be added using a **"+" icon**.
  - After reaching the limit of **3 categories**, the **"+" icon** should be hidden, and a notification should appear: **"Anda Sudah Mencapai Maksimum Input"**.
  - Users can delete categories using an **"x icon"**.

#### **3. Image Upload for Categories**
- **Features**:
  - Users can upload images in each category.
  - Supported file types: **JPG, JPEG, PNG**.
  - Users can delete uploaded images using a **trash bin icon**.
    - Clicking the trash bin icon triggers a confirmation popup with the message: **"Apakah Anda Yakin untuk Menghapus Gambar?"**.
    - The popup should have two buttons:
      - **"Batalkan"** (Cancel) button, styled in **gray (#808080)**.
      - **"Hapus"** (Delete) button, styled in **red (#D22B2B)**.

---

### 🖌️ **Design Guidelines**
- Follow a **low-fidelity design** approach with a clean and intuitive layout.
- Use **dynamic tables** for product and category lists.
- Ensure all buttons/icons (e.g., "+", "x", upload, trash bin) are visually distinct and functional.
- Notifications should be clear and styled for visibility.

---

### 💻 **Frontend Development Details**
- **Framework/Library**: Use React.js with vite
- **Styling**: Use CSS or TailwindCSS for styling. Ensure the design is responsive.
- **Components**:
  1. **Product List Component**:
     - Dynamic table for adding and deleting products.
     - Auto-increment functionality for numbering.
     - Notification for maximum limit.
  2. **Category List Component**:
     - Dynamic sub-table for adding and deleting categories within a product.
     - Notification for maximum limit.
  3. **Image Upload Component**:
     - File upload field with validation for file type.
     - Trash bin icon for deleting uploaded images.
     - Confirmation modal with styled buttons.

---

### 🚀 **Additional Notes**
- Ensure the interface is **accessible** and **user-friendly**.
- Validate all inputs (e.g., file type for image upload, product name field).
- Use Redux to handle dynamic lists and interactions.
- Provide **clear error messages** or notifications for invalid actions (e.g., unsupported file type).
- **use nix flake to manage the dev environment**
---

### Example UI Flow
1. **Product List Section**:
   - A table with fields: Number, Product Name, "+" icon, and "x icon".
   - Adding a product updates the table dynamically.
2. **Category Section (Nested)**:
   - Each product has a nested table for categories.
   - "+" icon and "x icon" for managing categories.
3. **Image Upload Section**:
   - Upload button/icon in each category.
   - Trash bin icon for deleting images.
   - Confirmation modal for delete actions.