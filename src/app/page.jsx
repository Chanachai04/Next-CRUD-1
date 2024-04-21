"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DeleteBtn from "./DeleteBtn";

export default function Home() {
    const [postData, setPostData] = useState([]);

    const getPost = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/posts", {
                cache: "no-store",
            });
            if (!res.ok) {
                throw new Error("Failed to fetch posts");
            }
            const data = await res.json();
            setPostData(data.posts);
        } catch (error) {
            console.log("Error loading posts: ", error);
        }
    };

    useEffect(() => {
        getPost();
    }, []);
    return (
        <main className="container mx-auto">
            <h3 className="font-bold text-3xl mt-3">CRUD</h3>
            <hr className="my-3 border border-black" />
            <button className="bg-green-500 p-2 text-white rounded-md hover:shadow-2xl mb-3 ">
                <Link href="/create">Create </Link>
            </button>
            {postData && postData.length > 0 ? (
                <div className="grid grid-cols-4 gap-5  ">
                    {postData.map((val) => (
                        <div key={val._id} className="shadow-lg p-5 rounded-xl hover:shadow-xl  ">
                            <h1 className="text-xl font-bold text-center">{val.title}</h1>
                            <hr className="my-3 border border-black" />
                            <div className="flex justify-center items-center my-3  ">
                                <img src={val.img} alt={val.title} className="w-[300px] h-[250px] object-cover object-center rounded-md shadow-md " />
                            </div>
                            <p>{val.content}</p>
                            <div className="mt-5">
                                <Link href={`/edit/${val._id}`} className="bg-sky-500 py-2 px-3 text-white rounded-md hover:shadow-2xl mb-3">
                                    Edit
                                </Link>
                                <DeleteBtn id={val._id}/>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="   w-full h-[80vh] flex justify-center items-center">
                    <p className="text-3xl font-bold underline hover:shadow-md">You do not have any posts</p>
                </div>
            )}
        </main>
    );
}
