"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreatePage() {
    const [title, setTitle] = useState("");
    const [img, setImg] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !img || !content) {
            setError("Please complete all inputs.");
            return;
        }
        try {
            const res = await fetch("http://localhost:3000/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, img, content }),
            });

            if (res.ok) {
                router.push("/");
            } else {
                throw new Error("Failed to create a post");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mx-auto">
            <h3 className="font-bold text-3xl mt-3">Create</h3>
            <hr className="my-3" />
            <button className="bg-sky-500 py-2 px-3 text-white rounded-md hover:shadow-2xl mb-3">
                <Link href="/">Back</Link>
            </button>
            {error && <p className="w-fit bg-red-500 text-white px-2 py-1 rounded-md">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    className={`block mt-4 border rounded p-3 text-lg ${error ? "border-red-500" : "border-black"}`}
                    type="text"
                    placeholder="Title"
                />
                <input
                    onChange={(e) => setImg(e.target.value)}
                    className={`block mt-4 border rounded p-3 text-lg ${error ? "border-red-500" : "border-black"}`}
                    type="text"
                    placeholder="URL"
                />
                <textarea
                    onChange={(e) => setContent(e.target.value)}
                    className={`block my-4 border rounded p-3 text-lg w-[271px] ${error ? "border-red-500" : "border-black"}`}
                    type="text"
                    placeholder="Content"
                />
                <button type="submit" className="bg-green-500 py-2 px-3 text-white rounded-md hover:shadow-2xl ">
                    Save
                </button>
            </form>
        </div>
    );
}
