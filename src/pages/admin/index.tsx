import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import { Layout } from "~/ui/components";

const Admin: NextPage = () => {
  const router = useRouter();

  const [formState, setFormState] = useState({
    login: "",
    password: "",
  });

  const handleLogin = async (e: SubmitEvent) => {
    e.preventDefault();

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    });

    if (response.ok) {
      return router.push("/admin/dashboard");
    }
  };

  return (
    <Layout isNavigationHidden={true}>
      <section className="flex h-screen w-full flex-col items-center justify-center">
        <h1 className="mb-10 text-4xl font-light">content panel.</h1>

        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleLogin}
          autoComplete="off"
          className="flex w-[350px] flex-col gap-4"
        >
          <input type="hidden" autoComplete="false" />

          <input
            onChange={(e) =>
              setFormState((p) => ({ ...p, login: e.target.value }))
            }
            placeholder="login"
            spellCheck={false}
            className="border-b border-gray-400 bg-transparent py-1.5 font-light outline-none transition-colors focus:border-black dark:focus:border-white"
          />

          <input
            onChange={(e) =>
              setFormState((p) => ({ ...p, password: e.target.value }))
            }
            placeholder="password"
            type="password"
            className="border-b border-gray-400 bg-transparent py-1.5 font-light outline-none transition-colors focus:border-black dark:focus:border-white"
          />

          <button
            type="submit"
            className="mt-10 opacity-50 transition-opacity hover:opacity-100"
          >
            log in
          </button>
        </form>
      </section>
    </Layout>
  );
};

export default Admin;
