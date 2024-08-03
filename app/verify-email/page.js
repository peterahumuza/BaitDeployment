"use client"
import React from 'react';
import {useRouter} from "next/navigation";
import {isICRC} from "@/firebase";

const VerifyEmail = () => {
    // route /verify-email not for ICRC
    let router = useRouter();
    if (isICRC) {
        router.push("/404");
        return null;
    }
    return (
            <div style={styles.container}>
                <h1 style={styles.message}>Please verify your email before having access to this page.</h1>
            </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f9f9f9',
    },
    message: {
        fontSize: '24px',
        color: '#333',
        textAlign: 'center',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#fff',
    },
};

export default VerifyEmail;