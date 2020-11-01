import React from 'react';
import { Error } from '../components/Error';
import { Header } from '../components/Header';

function NotFound() {
    return (
        <div>
            <Header />
            <Error
                status={404}
                message={"Paste not found."}
            />
        </div>
    )
}

export { NotFound };