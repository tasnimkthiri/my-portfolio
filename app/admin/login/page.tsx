import { loginAction } from "../actions";
export default async function Login({ searchParams }: { searchParams: Promise<{ e?: string }> }) {
  const { e } = await searchParams;
  return (
    <main className="max-w-sm mx-auto mt-32 px-5"><div className="bg-white rounded-[2rem] p-8">
      <h1 className="text-3xl font-bold mb-5">Admin sign in</h1>
      <form action={loginAction} className="grid gap-4"><label className="grid gap-1 font-medium">Password<input name="pw" type="password" required autoFocus /></label>
        <button className="btn">Sign in</button>{e && <p role="alert" className="text-red-700">Wrong password.</p>}</form></div></main>
  );
}
