import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="container" id="error-page">
            <div className="vertical-center text-center">
                <h1>Ой-ой!</h1>
                <p>На сайте произошла ошибка.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
        </div>
    );
}