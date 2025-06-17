import { Header } from "../components/Header"
import { Link } from "react-router"
import './ErrorPage.css'

export function ErrorPage() {
    return (
        <>
					<Header/>

					<div className="error-page">
						<h1 className="error-code">404</h1>
						<p className="error-message">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
						<Link to="/" className="back-home-link">Go back home</Link>

      		</div>
        </>
    )
}