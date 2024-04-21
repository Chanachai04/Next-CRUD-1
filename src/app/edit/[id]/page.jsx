"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditPage({ params }) {
    const { id } = params;
    const [postData, setPostData] = useState("");

    // New data of posts
    const [newTitle, setNewTitle] = useState("");
    const [newImg, setNewImg] = useState("");
    const [newContent, setNewContent] = useState("");
    console.log(postData);

    const router = useRouter();

    const notify = () =>
        toast.success("Success", {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    const getPostById = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
                method: "GET",
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error("Failed to fetch a post");
            }

            const data = await res.json();
            console.log("Edit post: ", data);
            setPostData(data.post);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getPostById(id);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ newTitle, newImg, newContent }),
            });
            if (!res.ok) {
                throw new Error("Failed to update");
            }
            router.refresh;
            notify();
            setTimeout(() => {
                router.push("/");
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="container mx-auto">
            <h3 className="font-bold text-3xl mt-3">Edit</h3>
            <hr className="my-3" />
            <button className="bg-sky-500 py-2 px-3 text-white rounded-md hover:shadow-2xl mb-3">
                <Link href="/">Back</Link>
            </button>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="block mt-4 border rounded p-3 text-lg "
                    type="text"
                    placeholder={postData.title}
                />
                <input onChange={(e) => setNewImg(e.target.value)} className="block mt-4 border rounded p-3 text-lg " type="text" placeholder={postData.img} />
                <textarea
                    onChange={(e) => setNewContent(e.target.value)}
                    className="block my-4 border rounded p-3 text-lg w-[271px] "
                    type="text"
                    placeholder={postData.content}
                />
                <button type="submit" className="bg-green-500 py-2 px-3 text-white rounded-md hover:shadow-2xl " >
                    Update
                </button>
                <ToastContainer />
            </form>
        </div>
    );
}
