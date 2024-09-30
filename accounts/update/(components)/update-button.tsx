"use client";
import React from "react";
import { useFormStatus } from "react-dom";

function UpdateButton() {
    const { pending } = useFormStatus();
  return (
    <>
      <div className="form-control mt-6">
        <button disabled={pending} className="btn btn-primary" type="submit">
          {pending ? (
            <span className="loading loading-dots loading-sm"></span>
          ) : (
            "Update Password"
          )}
        </button>
      </div>
    </>
  )
}

export default UpdateButton