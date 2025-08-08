"use client";
import { CheckCheck, Plus, Store } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ProductForm() {
  const editorRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discount_price: "",
    video_url: "",
    price2: "",
    rating: "0.0",
    stock: "",
    product_id: "",
    categories: "",
    status: "",
    images: [],
    video_file: null,
    ages: "0",
  });

  const [imagePreviews, setImagePreviews] = useState([null, null, null, null]);
  const [images, setImages] = useState([null, null, null, null]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgechange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, ages: value }));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = {
        file,
        url: URL.createObjectURL(file),
      };
      setImages(newImages);

      const updatedPreviews = [...imagePreviews];
      updatedPreviews[index] = URL.createObjectURL(file);
      setImagePreviews(updatedPreviews);

      const updatedFormImages = [...formData.images];
      updatedFormImages[index] = file;
      setFormData((prev) => ({ ...prev, images: updatedFormImages }));

      if (!selectedImage) {
        setSelectedImage(URL.createObjectURL(file));
      }
    }
  };

  const removeImage = (index) => {
    const updatedPreviews = [...imagePreviews];
    updatedPreviews[index] = null;
    setImagePreviews(updatedPreviews);

    const updatedImages = [...formData.images];
    updatedImages[index] = null;
    setFormData((prev) => ({ ...prev, images: updatedImages }));

    if (selectedImage === imagePreviews[index]) {
      setSelectedImage(null);
    }
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
      setFormData((prev) => ({
        ...prev,
        video_file: file,
      }));
    }
  };

  useEffect(() => {
    return () => {
      videoPreview && URL.revokeObjectURL(videoPreview);
    };
  }, [videoPreview]);

  const handleSubmit = async (e, overrideStatus = null) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.description || !formData.price || !formData.stock) {
      Swal.fire({
        title: "Please fill all required fields",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    try {
      // প্রথমে সব ছবি আপলোড করবো যদি তারা File হয়
      const uploadedImageUrls = [];

      for (let image of formData.images) {
        if (image instanceof File) {
          const imageForm = new FormData();
          imageForm.append("image", image);

          try {
            const uploadRes = await fetch("http://localhost:5000/api/upload-images", {
              method: "POST",
              body: imageForm,
            });

            if (!uploadRes.ok) {
              Swal.fire({
                title: "Image upload failed",
                text: `Status: ${uploadRes.status} ${uploadRes.statusText}`,
                icon: "error",
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6",
              });
              return;
            }

            const uploadData = await uploadRes.json();

            if (!uploadData.success) {
              Swal.fire({
                title: "Image upload failed",
                text: uploadData.message || "Unknown error",
                icon: "error",
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6",
              });
              return;
            }

            uploadedImageUrls.push(uploadData.url);
          } catch (uploadError) {
            Swal.fire({
              title: "Image upload failed , Sever Down",
              text: uploadError.message,
              icon: "error",
              confirmButtonText: "OK",
              confirmButtonColor: "#3085d6",
            });
            return;
          }
        } else if (typeof image === "string") {
          // Already uploaded URL
          uploadedImageUrls.push(image);
        }
      }

      // ভিডিও ফাইল আপলোড
      let uploadedVideoUrl = formData.video_url; // যদি ইউআরএল আগে থেকেই থাকে
      if (formData.video_file instanceof File) {
        const videoForm = new FormData();
        videoForm.append("video", formData.video_file);

        try {
          const videoUploadRes = await fetch("http://localhost:5000/api/upload-video", {
            method: "POST",
            body: videoForm,
          });

          if (!videoUploadRes.ok) {
            Swal.fire({
              title: "Video upload failed",
              text: `Status: ${videoUploadRes.status} ${videoUploadRes.statusText}`,
              icon: "error",
              confirmButtonText: "OK",
              confirmButtonColor: "#3085d6",
            });
            return;
          }

          const videoUploadData = await videoUploadRes.json();

          if (!videoUploadData.success) {
            Swal.fire({
              title: "Video upload failed",
              text: videoUploadData.message || "Unknown error",
              icon: "error",
              confirmButtonText: "OK",
              confirmButtonColor: "#3085d6",
            });
            return;
          }

          uploadedVideoUrl = videoUploadData.url;
        } catch (videoUploadError) {
          Swal.fire({
            title: "Video upload failed",
            text: videoUploadError.message,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6",
          });
          return;
        }
      }

      // এখন পুরো প্রোডাক্ট ডেটা তৈরি করব
      const payload = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        discount_price: formData.discount_price,
        price2: formData.price2,
        rating: formData.rating,
        stock: formData.stock,
        product_id: formData.product_id,
        categories: formData.categories,
        ages: formData.ages,
        images: uploadedImageUrls, // আপলোডেড ইমেজ ইউআরএল গুলো
        video_url: formData.video_url, // আপলোডেড ভিডিও ইউআরএল
        video_file: uploadedVideoUrl,
        status: overrideStatus || formData.status,
      };

      let response;
      try {
        response = await axios.post("http://localhost:5000/api/add-786-products", payload, {
          timeout: 10000,
        });
      } catch (axiosError) {
        Swal.fire({
          title: "Request Failed",
          text: `${axiosError.message || "Network error occurred"}\nStatus: ${axiosError.response?.status || "Unknown"}`,
          icon: "error",
          draggable: true,
        });
        return;
      }

      if (response.data && response.data.success) {
        Swal.fire({
          title: response.data.message || "Product Added Successfully",
          icon: "success",
          draggable: true,
        });

        // রিসেট ফর্ম
        setFormData({
          title: "",
          description: "",
          price: "",
          discount_price: "",
          video_url: "",
          price2: "",
          rating: "0.0",
          stock: "",
          product_id: "",
          categories: "",
          status: "disabled",
          images: [],
          video_file: null,
          ages: "0",
        });

        setImagePreviews([null, null, null, null]);
        setImages([null, null, null, null]);
        setSelectedImage(null);
        setVideoPreview(null);
      } else {
        Swal.fire({
          title: "Failed to submit product",
          text: response.data.message || "Unknown error occurred",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error submitting product",
        text: error.response?.data?.message || error.message,
        icon: "error",
        draggable: true,
      });
    }
  };

  return (
    <div className="w-full px-4 ">
      <h2 className="flex items-center gap-4 text-neutral font-semibold mb-6">
        <Store />
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-custon-g p-6 rounded-lg">
          <h2 className="text-neutral font-bold">General Information</h2>
          <div>
            <label className="text-sm font-medium text-gray-600">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="custom-input" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Description</label>
            <Editor
              apiKey="4h68xa2bk5bd2dvb40nxwmyjca5kj6w2th78sfo2174e13k1"
              onInit={(evt, editor) => (editorRef.current = editor)}
              value={formData.description}
              init={{
                height: 300,
                menubar: false,
                plugins: ["advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "help", "wordcount"],
                toolbar: "undo redo | formatselect | bold italic backcolor | " + "alignleft aligncenter alignright alignjustify | " + "bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={(newContent) => setFormData((prev) => ({ ...prev, description: newContent }))}
            />
          </div>
        </div>

        <div className="space-y-4 bg-custon-g p-6 rounded-lg">
          <h2 className="text-neutral font-bold">Media Information</h2>

          {selectedImage && (
            <div className="w-full h-60 relative mx-auto rounded overflow-hidden border-dashed border-2 border-gray-300 mb-4">
              <Image src={selectedImage} alt="Selected Preview" fill className="object-contain" />
            </div>
          )}

          <aside className="grid grid-cols-4 gap-4 mb-6">
            {images.map((img, index) => (
              <div key={index}>
                <label className="block font-medium mb-1">Image {index + 1}</label>
                <div className="flex items-center space-x-4">
                  <input type="file" id={`featured_image_${index}`} accept="image/*" onChange={(e) => handleImageChange(e, index)} className="hidden" />
                  <label htmlFor={`featured_image_${index}`} className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 border border-gray-300 rounded cursor-pointer hover:bg-gray-200 transition overflow-hidden">
                    {img ? <Image src={img.url} alt={`Preview ${index + 1}`} width={80} height={80} className="object-cover w-full h-full" onClick={() => setSelectedImage(img.url)} /> : <Plus className="w-6 h-6 text-gray-600" />}
                  </label>
                </div>
              </div>
            ))}
          </aside>

          {videoPreview && (
            <div className="w-full h-60 border-2 border-dashed border-gray-300 rounded flex items-center justify-center overflow-hidden">
              <video src={videoPreview} controls className="w-full h-full object-cover rounded" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Video url</label>
              <input type="text" name="video_url" value={formData.video_url} onChange={handleChange} placeholder="https://example.com/video.mp4" className="custom-input" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Upload Video File</label>
              <input type="file" name="video_file" accept="video/*" onChange={handleVideoFileChange} className="custom-input" />
            </div>
          </div>
        </div>

        <div className="space-y-4 bg-custon-g p-6 rounded-lg">
          <h2 className="text-neutral font-bold">Pricing & Inventory</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Base Price</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="custom-input" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Discount Price</label>
              <input type="number" name="discount_price" value={formData.discount_price} onChange={handleChange} className="custom-input" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Additional Price</label>
              <input type="number" name="price2" value={formData.price2} onChange={handleChange} className="custom-input" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Stock</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="custom-input" />
            </div>
          </div>
        </div>

        <div className="space-y-4 bg-custon-g p-6 rounded-lg">
          <h2 className="text-neutral font-bold">Product Details</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Categories</label>
              <input type="text" name="categories" value={formData.categories} onChange={handleChange} className="custom-input" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Product ID</label>
              <input type="text" name="product_id" value={formData.product_id} onChange={handleChange} className="custom-input" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Ages</label>
              <select name="ages" value={formData.ages} onChange={handleAgechange} className="custom-input">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10+">10+</option>
              </select>
            </div>{" "}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Rating</label>
              <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} className="custom-input" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="custom-input">
                <option value="disabled">Disabled</option>
                <option value="live">Live</option>
              </select>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="custom-btn-01 bg-custon-g1 flex items-center gap-2">
            <CheckCheck />
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
