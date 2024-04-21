"use client";
import React from "react";

export default function DeleteBtn({ id }) {
    const handleDelete = async () => {
        const confirmed = confirm("Are you sure?");
        if (confirmed) {
            const res = await fetch(`http://localhost:3000/api/posts?id=${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                window.location.reload();
            }
        }
    };
    return <a onClick={handleDelete} className="bg-red-500 py-2 px-3 text-white rounded-md hover:shadow-2xl mx-3 cursor-pointer">Delete</a>;
}
