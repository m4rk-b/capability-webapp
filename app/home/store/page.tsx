import React from 'react';
import { getSession } from '@/lib';
import { redirect } from 'next/navigation';

async function Store() {

    const session = await getSession();
    if (!session) {
        redirect('/login');
    }

  return (
    <div>Store</div>
  )
}

export default Store;