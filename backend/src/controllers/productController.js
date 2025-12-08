import { application } from "express";
import productModel from "../models/productModel.js";
import UserModel from "../models/userModel.js";

async function addProduct(req,res){
    const {owner,title,description,techStack,repoUrl,liveUrl,thumbnail,visibility}=req.body;
    const userId=req.user._id;
    try{
        const existingProduct = await productModel.findOne({title:title,owner:userId});
        if(existingProduct){
            return res.status(400).json({message:"Product already exists"});
        }

      const newProduct = new productModel({
        owner: userId,
        title,
        description,
        techStack,
        repoUrl,
        liveUrl,
        thumbnail,
        visibility
      });

        await newProduct.save();
        // Add created project reference to user's createdProjects array
        try {
          await UserModel.findByIdAndUpdate(userId, { $addToSet: { createdProjects: newProduct._id } });
        } catch (uErr) {
          console.error("Failed to update user's createdProjects:", uErr);
          // continue: product is saved, but user array update failed
        }

        res.status(201).json({message:"Product added successfully", product: newProduct});
    } catch (error) {
        console.error("Error in addProduct:", error);
        res.status(500).json({ message: "Server error", details: error.message });
    }
}

async function getMyProducts(req, res) {
  try {
    const userId = req.user._id;  // you already extracted this from middleware

    if (!userId) {
      return res.status(400).json({ message: "User ID missing in request" });
    }

    const products = await productModel.find({ owner: userId });

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (err) {
    console.error("Error in getMyProducts:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching products",
    });
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await productModel.find({ visibility: "public" });
    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (err) {
    console.error("Error in getAllProducts:", err);
    return res.status(500).json({   
        success: false,
        message: "Server error while fetching products",
    });
  }
}
async function getProductById(req, res) {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId).populate('owner', 'name email').populate('likes', '_id').populate('bookmarks', '_id');

    if (!product) { 
        return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    console.error("Error in getProductById:", err);
    return res.status(500).json({
        success: false,
        message: "Server error while fetching the product",
    });
  }
}

const toggleLike = async (req, res) => {
  try {
    const userId = req.user._id;            // logged-in user id from auth middleware
    const { id } = req.params;              // product id from URL

    // find product
    const product = await productModel.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // check if user already liked
    const alreadyLiked = product.likes.some(l => l.toString() === userId.toString());

    if (alreadyLiked) {
      // remove like
      product.likes = product.likes.filter(l => l.toString() !== userId.toString());
    } else {
      // add like
      product.likes.push(userId);
    }

    await product.save();

    return res.status(200).json({
      success: true,
      liked: !alreadyLiked,
      likesCount: product.likes.length,
      productId: product._id
    });
  } catch (err) {
    console.error("toggleLike error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


// Toggle bookmark
async function toggleBookmark (req, res) {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const product = await productModel.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const alreadyBookmarked = product.bookmarks.some(b => b.toString() === userId.toString());

    if (alreadyBookmarked) {
      product.bookmarks = product.bookmarks.filter(b => b.toString() !== userId.toString());
    } else {
      product.bookmarks.push(userId);
    }

    await product.save();

    return res.status(200).json({
      success: true,
      bookmarked: !alreadyBookmarked,
      bookmarksCount: product.bookmarks.length,
      productId: product._id
    });
  } catch (err) {
    console.error("toggleBookmark error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

async function bookMarked(req, res) {
  const userId = req.user._id;  

  try {
    // Find all products where userId is in the bookmarks array
    const bookmarkedProducts = await productModel.find({ bookmarks: userId }).populate('owner', 'name email');

    if (!bookmarkedProducts) {
      return res.status(404).json({
        success: false,
        message: "No bookmarked products found",
      });
    }

    return res.status(200).json({
      success: true,
      count: bookmarkedProducts.length,
      bookmarks: bookmarkedProducts,
    });

  } catch (err) {
    console.error("Error in bookMarked:", err);
    
    return res.status(500).json({
      success: false,
      message: "Server error while fetching bookmarks",
    });
  }
}

async function deleteProduct(req,res) {
  const productId = req.params.id;
  try {
    const deletedProduct = await productModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    // Remove reference from owner's createdProjects array
    try {
      if (deletedProduct.owner) {
        await UserModel.findByIdAndUpdate(deletedProduct.owner, { $pull: { createdProjects: deletedProduct._id } });
      }
    } catch (uErr) {
      console.error("Failed to remove project from user's createdProjects:", uErr);
      // continue; product is deleted
    }
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.error("Error in deleteProduct:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting the product",
    });
  }
}

export {addProduct,getMyProducts,getAllProducts,getProductById,toggleLike,toggleBookmark,bookMarked,deleteProduct};