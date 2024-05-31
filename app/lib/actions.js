"use server"

import { revalidatePath } from "next/cache"
import { Product, User } from "./models"
import { connectToDB } from "./utils"
import { redirect } from "next/navigation"
import bcrypt from "bcrypt"
import { signIn } from "../auth"


export const addUser = async (formData) => {
    const { username, email, password, phone, address, isAdmin, isActive } = Object.fromEntries(formData)

    try {
        connectToDB()
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User(
            { username, email, password: hashedPassword, phone, address, isAdmin, isActive }
        )
        await newUser.save()

    } catch (error) {
        console.log(error)
        throw new Error("Failed to create user !", error)
    }

    revalidatePath("/dashboard/users")
    redirect("/dashboard/users");
}

export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData)

    try {
        connectToDB()
        await User.findByIdAndDelete(id);

    } catch (error) {
        console.log(error)
        throw new Error("Failed to delete user !", error)
    }

    revalidatePath("/dashboard/users")
}

export const updateUser = async (formData) => {
    const { id, username, email, password, phone, address, isAdmin, isActive } = Object.fromEntries(formData)

    try {
        connectToDB()
        let updatedFields = { username, email, password, phone, address, isAdmin, isActive };
        Object.keys(updatedFields).forEach((key) => (updatedFields[key] === "" || undefined) && delete updatedFields[key])
        await User.findByIdAndUpdate(id, updatedFields)

    } catch (error) {
        console.log(error)
        throw new Error("Failed to update user !", error)
    }

    revalidatePath("/dashboard/users")
    redirect("/dashboard/users");
}

export const addProduct = async (formData) => {
    const { title, desc, price, stock, color, size } = Object.fromEntries(formData)

    try {
        connectToDB()
        const newProduct = new Product(
            { title, desc, price, stock, color, size }
        )
        await newProduct.save()

    } catch (error) {
        console.log(error)
        throw new Error("Failed to create product !", error)
    }

    revalidatePath("/dashboard/products")
    redirect("/dashboard/products");
}

export const deleteProduct = async (formData) => {
    const { id } = Object.fromEntries(formData)

    try {
        connectToDB()
        await Product.findByIdAndDelete(id);

    } catch (error) {
        console.log(error)
        throw new Error("Failed to delete product !", error)
    }

    revalidatePath("/dashboard/products")
}

export const updateProduct = async (formData) => {
    const { id, title, desc, price, stock, color, size } = Object.fromEntries(formData)

    try {
        connectToDB()
        let updatedFields = { title, desc, price, stock, color, size };
        Object.keys(updatedFields).forEach((key) => (updatedFields[key] === "" || undefined) && delete updatedFields[key])
        await Product.findByIdAndUpdate(id, updatedFields)

    } catch (error) {
        console.log(error)
        throw new Error("Failed to update product !", error)
    }

    revalidatePath("/dashboard/products")
    redirect("/dashboard/products");
}

export const authenticate = async (prevState, formData) => {
    const { username, password } = Object.fromEntries(formData);

    try {
        await signIn("credentials", { username, password });
    } catch (err) {
        if (err.message.includes("CredentialsSignin")) {
            return "Wrong Credentials";
        }
        throw err;
    }
};