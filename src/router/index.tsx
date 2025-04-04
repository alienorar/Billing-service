import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import App from '../App.tsx';
import {
    SignIn,
    AdminPanel,
    AdminPage,
    Role,
    Students,
    OneStudent,
    NotFound,

} from '@modules'

const Index = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path="/" element={<App />}>
                    <Route path="/" element={<SignIn />} />
                    <Route path="super-admin-panel" element={<AdminPanel />}>
                        <Route index element={<Role />} />
                        <Route path="admin-page" element={<AdminPage />} />
                        <Route path="students" element={<Students />} />
                        <Route path="students/:id" element={<OneStudent />} />

                    </Route>
                </Route>
                <Route path="*" element={<NotFound />}></Route>
            </Route>
        )
    )
    return <RouterProvider router={router} />;
}
export default Index;

