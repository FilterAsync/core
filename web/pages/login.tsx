import Head from "next/head";
import axios from "axios";
import { useFormik, Formik, Form } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Core - Log In</title>
            </Head>

            <h1>Log in page</h1>

            <Formik
                initialValues={{
                    name: "",
                    pass: "",
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    const res = await fetch("http://localhost:8080/api/login", {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                    });
                    if (res.status == 200) {
                        setSubmitting(false);
                        router.push("/dashboard");
                        console.log("Data submitted!");
                    }
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
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Username:</label>

                        <input
                            type="name"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />

                        <label htmlFor="pass">Password:</label>

                        <input
                            type="password"
                            name="pass"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.pass}
                        />

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        </>
    );
}
