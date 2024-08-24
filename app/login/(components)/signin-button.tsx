"use client";
import React from "react";
import { useFormStatus } from "react-dom";

function SignInButton() {
  const { pending } = useFormStatus();
  return (
    <>
      <div className="form-control mt-6">
        <button disabled={pending} className="btn btn-primary" type="submit">
          {pending ? (
            <span className="loaging loading-dots loading-sm"></span>
          ) : (
            "Sign In"
          )}
        </button>
      </div>
    </>
  );
}

export default SignInButton;
