//use client
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div className="form">
        <form>
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="uname" required className="text-black" />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required className="text-black"/>
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
          <div className="button-container">
            <Link href="/login">
              <button className="bg-blue-500 text-white py-2 px-4 rounded">
                Go to Login
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="bg-blue-500 text-white py-2 px-4 rounded">
                Main view
              </button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}