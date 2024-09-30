import { updatePassword } from '@/lib';
import React from 'react'

function UpdatePassword() {
    const handleupdate = async (formData: FormData) => {
        'use server';
        const res = await updatePassword(formData);
    };
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="card bg-base-100 max-w-sm shrink-0 shadow-lg">
        <form className="card-body" action={handleupdate}>
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
              <span className="label-text">Old Password</span>
            </label>
            <input
              type="password"
              name="oldpassword"
              placeholder="old password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">New Password</span>
            </label>
            <input
              type="password"
              name="newpassword"
              placeholder="new password"
              className="input input-bordered"
              required
            />
          </div>
          <UpdatePassword />
        </form>
      </div>
    </main>
  )
}

export default UpdatePassword