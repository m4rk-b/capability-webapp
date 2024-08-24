import React from "react";
import SignInButton from "./(components)/signin-button";
import { getSession, login } from "@/lib";
import { redirect } from "next/navigation";

async function SignIn() {

  const session = await getSession();
  if (session) {
    redirect('/home/store');
  }

  const handleLogin = async (formData: FormData) => {
    'use server';
    await login(formData);
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="card bg-base-100 max-w-sm shrink-0 shadow-lg">
        <form className="card-body" action={handleLogin}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="username"
              className="input input-bordered"
              autoComplete="off"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <SignInButton />
        </form>
      </div>
    </main>
  );
}

export default SignIn;
