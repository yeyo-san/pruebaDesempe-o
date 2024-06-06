import { loginPage } from "./pages/public/login/loginPage";
import { registerPage } from "./pages/public/register/registerPage";
import { not_foundPage } from "./pages/public/notFound/not_foundPage";
import { homePage } from "./pages/private/home";
import { editPage } from "./pages/private/edit/editPage";
import { createPage } from "./pages/private/create/createPage";
import { flightsPage } from "./pages/private/allFlys/flights";

export const routes = {
    public: [
        { path: '/', page: loginPage},
        { path: '/register', page: registerPage},
        { path: '/not-found', page: not_foundPage}
    ],
    private: [
        { path: '/home', page: homePage},
        { path: '/home/edit', page: editPage},
        { path: '/home/create', page: createPage},
        { path: '/home/all', page: flightsPage}
    ]
}
