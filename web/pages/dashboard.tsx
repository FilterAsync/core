import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { verifyUser } from "../modules/verifyUser";
import io from "socket.io-client";
import { Formik } from "formik";

const URL = "http://127.0.0.1:8081/";

const socket = io(URL, { autoConnect: false });

export default function Dashboard() {
    const [senders, setSenders] = useState([]);
    const [name, setName] = useState("");
    const [clientId, setClientId] = useState("");
    const [dms, setDms] = useState(false);

    useEffect(() => {
        socket.on("connected", (id) => {
            setClientId(id);
        });

        socket.on("servermessage", (data) => {
            if (
                socket.id != data.id &&
                socket.id == data.packet.values.receiver
            ) {
                setSenders([data.id]);
                console.log(senders);
            }
        });
    }, []);

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

            <Formik
                initialValues={{
                    name: "",
                }}
                onSubmit={(values, { setSubmitting }) => {
                    socket.auth = { values };
                    console.log("Authenticated");
                    socket.connect();
                    console.log("Socket connected");
                    setSubmitting(false);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label htmlFor="name">Name:</label>

                        <input
                            type="name"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>

            {name && (
                <button
                    onClick={() => {
                        setDms(dms === false ? true : false);
                        console.log(dms);
                    }}
                >
                    DMs
                </button>
            )}

            {!dms && name && (
                <>
                    <h1>Send Message</h1>
                    <Formik
                        initialValues={{
                            receiver: "",
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log("New connection started");
                            socket.emit("messagepacket", { values });
                            setSubmitting(false);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <label htmlFor="receiver">
                                    New conversation:
                                </label>

                                <input
                                    type="receiver"
                                    name="receiver"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.receiver}
                                />

                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </form>
                        )}
                    </Formik>
                    <h1>Message</h1>
                    <h1>Your ID: {clientId}</h1>

                    <h1>Direct messages</h1>
                </>
            )}
        </>
    );
}
