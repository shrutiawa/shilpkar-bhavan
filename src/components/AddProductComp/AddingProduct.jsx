import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./addProductPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faClose,
  faFaceSmile,
  faFileUpload,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@apollo/client";
import LocaleContext from "../HelperComp/localeContextProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GET_ADDPRODUCT_CONTENT from "./graphql";

const AddingProduct = () => {
  const { locale } = useContext(LocaleContext);
  const { loading, error, data } = useQuery(GET_ADDPRODUCT_CONTENT, {
    variables: { locale },
  });

  const [categories, setCategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProductType, setSelectedProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [description, setDescription] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const imgbbAPIKey = "61661e84f61a7128cb6ab2b7700043cb";
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${REACT_APP_BACKEND_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProductTypes = async () => {
      try {
        const response = await axios.get(`${REACT_APP_BACKEND_URL}/product-types`);
        setProductTypes(response.data);
      } catch (error) {
        console.error("Error fetching product types:", error);
      }
    };

    fetchCategories();
    fetchProductTypes();
  }, []);

  const uploadImageToImgBB = async (base64Image) => {
    const formData = new FormData();
    formData.append("key", imgbbAPIKey);
    formData.append("image", base64Image);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("form data", response.data.data.url);
      return response.data.data.url;
    } catch (error) {
      console.error("Error uploading image to ImgBB:", error);
      throw error;
    }
  };

  const handleImageUpload = async (e) => {
    console.log("image upload", e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result.split(",")[1];
        const uploadedImageUrl = await uploadImageToImgBB(base64String);
        setImageUrl(uploadedImageUrl);
        setPreviewUrl(reader.result); // Set the preview URL to display the image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e) => {
    console.log("image url", e.target.value);
    setImageUrl(e.target.value);
    setPreviewUrl(e.target.value); // Set the preview URL to display the image
  };

  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const handleDescriptionChange = (value) => {
    setDescription(stripHtmlTags(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    if (
      !selectedCategory ||
      !selectedProductType ||
      !productName ||
      !price ||
      !color ||
      !size ||
      !material ||
      !imageUrl ||
      !description
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      let imageUploadUrl = imageUrl;
      if (imageUrl.startsWith("data:")) {
        imageUploadUrl = await uploadImageToImgBB(imageUrl);
      }

      const productData = {
        categoryId: selectedCategory,
        productTypeId: selectedProductType,
        name: productName,
        price: parseFloat(price),
        color,
        size,
        material,
        imageUrl: imageUploadUrl,
        description,
      };
      console.log("product", productData);

      const response = await axios.post(
        `${REACT_APP_BACKEND_URL}/products`,
        productData
      );
      console.log("response of product", response.data.message);
      if (response.data.message === "Product added successfully!") {
        setShowSuccessPopup(true);
      }

      // Reset form after successful submission
      setSelectedCategory("");
      setSelectedProductType("");
      setProductName("");
      setPrice("");
      setColor("");
      setSize("");
      setMaterial("");
      setImageUrl("");
      setPreviewUrl("");
      setDescription("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();

    setSelectedCategory("");
    setSelectedProductType("");
    setProductName("");
    setPrice("");
    setColor("");
    setSize("");
    setMaterial("");
    setImageUrl("");
    setPreviewUrl("");
    setDescription("");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data?.addProductCollection?.items.length) {
    return <p>No data available</p>;
  }

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  const {
    heading,
    generalInfo,
    productAttributes,
    category,
    pricing,
    productMedia,
    buttons,
  } = data.addProductCollection.items[0];
  console.log(productMedia, buttons);

  return (
    <>
      <div className="add-product-container">
        <h1>{heading}</h1>
        <div>
          <form className="add-product-form">
            <div className="add-product-detail">
              <div className="product-general-detail">
                <h3>{generalInfo.generalInfo}</h3>
                <label htmlFor="productName">{generalInfo.productName}</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder={generalInfo.productNamePlaceholder}
                />
                <label htmlFor="description">
                  {generalInfo.productDescription}
                </label>
                <ReactQuill
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder={generalInfo.productDescriptionPlaceholder}
                />
              </div>

              <div className="product-general-detail ">
                <h3>{productAttributes.productAttributes}</h3>
                <div className="details">
                  <div className="input-container">
                    <label htmlFor="color">
                      {productAttributes.productColor}
                    </label>
                    <input
                      type="text"
                      id="color"
                      name="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      placeholder={productAttributes.productColorPlaceholder}
                    />
                  </div>
                  <div className="input-container">
                    <label htmlFor="size">
                      {productAttributes.productSize}
                    </label>
                    <input
                      type="text"
                      id="size"
                      name="size"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      placeholder={productAttributes.productSizePlaceholder}
                    />
                  </div>
                </div>
                <label htmlFor="material">
                  {productAttributes.materialUsed}
                </label>
                <input
                  type="text"
                  id="material"
                  name="material"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  placeholder={productAttributes.materialUsedPlaceholder}
                />
              </div>
              <div className="product-general-detail">
                <h3>{pricing.pricing}</h3>
                <label htmlFor="price">{pricing.price}</label>
                <div className="price-input-container">
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder={pricing.pricePlaceholder}
                  />
                </div>
              </div>
            </div>

            <div className="add-product-image">
              <div className="product-general-detail">
                <h3>{category.category}</h3>
                <label htmlFor="category">{category.productCategory}</label>
                <select
                  id="category"
                  name="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">
                    {category.productCategoryPlaceholder}
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="productType">{category.productType}</label>
                <select
                  id="productType"
                  name="productType"
                  value={selectedProductType}
                  onChange={(e) => setSelectedProductType(e.target.value)}
                >
                  <option value="">{category.productTypePlaceholder}</option>
                  {productTypes.map((productType) => (
                    <option key={productType.id} value={productType.id}>
                      {productType.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="product-general-detail">
                <h3>{productMedia.productMedia}</h3>
                <div className="product-media">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Product Preview"
                      className="image-preview"
                    />
                  ) : (
                    <>
                      <label className="custom-file-upload" htmlFor="imageUrl">
                        <div className="icon">
                          <FontAwesomeIcon icon={faFileUpload} />
                        </div>
                        <div className="text">
                          <span>{productMedia.clickToAdd}</span>
                        </div>
                        <input
                          type="file"
                          id="imageUrl"
                          name="imageUrl"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                      <div>{productMedia.or}</div>
                    </>
                  )}
                  <div className="url-input">
                    <label htmlFor="imageUrl">{productMedia.ImageURL}</label>
                    <input
                      type="text"
                      id="imageUrl"
                      name="imageUrl"
                      value={imageUrl}
                      onChange={handleImageUrlChange}
                      placeholder={productMedia.ImageURLPlaceholder}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="btn-container">
            <button className="btn-submit" onClick={handleSubmit} type="submit">
              {buttons.submitBtn}
            </button>
            <button className="btn-submit" onClick={handleCancel} type="submit">
              {buttons.cancelBtn}
            </button>
          </div>
        </div>
      </div>
      {showSuccessPopup && (
        <div className="success-popup">
          <div className="success-modal">
            <div className="close-success" onClick={handleClosePopup}>
              <FontAwesomeIcon icon={faClose} />
            </div>
            <div className="popup-text">
              <FontAwesomeIcon
                size="2x"
                icon={faCircleCheck}
                style={{ marginBottom: 15 }}
              />
              <p>Your product has been added. Successfully!!</p>
              <div>
                {" "}
                Please wait for admin approval.{" "}
                <FontAwesomeIcon icon={faFaceSmile} />
              </div>

              <div>
                After approval, you will find your product on the product list
                page.
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-center" />
    </>
  );
};

export default AddingProduct;
