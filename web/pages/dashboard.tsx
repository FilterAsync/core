import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { verifyUser } from "../modules/verifyUser";
import io from "socket.io-client";
import { Formik } from "formik";

const URL = "http://localhost:8081/";

const socket = io(URL, { autoConnect: false });

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        verifyUser().then((res) => {
            if (res.status != 200) {
                router.push("/login");
            }
        });
    });

    return (
        <>
            <Head>
                <title>Core - Dashboard</title>
            </Head>
            <h1>Dashboard</h1>
        </>
    );
}
