import React, { Suspense, lazy } from "react";
import { Routes as Routers, Route } from "react-router-dom";
import getUser from "./helper/User";

const PageNotFound = lazy(() => import("./Views/ErrorView/NotFoundPage"));
const HomePage = lazy(() => import("./Views/HomeView/HomePage"));
const Test = lazy(() => import("./Views/TestView/TestPage"));
const TestStart = lazy(() => import("./Views/TestView/TestStartPage"));
const ResultTest = lazy(() => import("./Views/TestView/ResultPage"));
const HisoryPage = lazy(() => import("./Views/TestView/HistoryPage"));
const FlashCardUserPage = lazy(() => import("./Views/FlashCardView/FlashCardPage"));
const FlashCardDetail = lazy(() => import("./Views/FlashCardView/FlashCardDetail"));
const FlashCardStart = lazy(() => import("./Views/FlashCardView/FlashCardStart"));
const FlashCardTest = lazy(() => import("./Views/FlashCardView/FlashCardTest"));
const ResetPassword = lazy(() => import("./Views/HomeView/ResetPassword"));

const HomeAdminPage = lazy(() => import("./admin/view/HomeAdminPage"));
const TestAdminPage = lazy(() => import("./admin/view/TestAdminPage"));
const AddTestPage = lazy(() => import("./admin/view/AddTestPage"));
const AddPartPage = lazy(() => import("./admin/view/AddPartPage"));
const AddQuestionPage = lazy(() => import("./admin/view/AddQuestionPage"));
const FlashCardPage = lazy(() => import("./admin/view/FlashCardPage"));

export default function Routes() {
    const user = getUser();
    const isAdmin = user?.roles.includes("ROLE_ADMIN");

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routers>
                <Route path="/" element={<HomePage />} />
                <Route path="/*" element={<PageNotFound />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/test-simulator" element={<Test />} />
                <Route path="/test/start/:id" element={<TestStart />} />
                <Route path="/test/result/:id" element={<ResultTest />} />
                <Route path="/test/analysis" element={<HisoryPage />} />
                <Route path="/flash-card" element={<FlashCardUserPage />} />
                <Route path="/flash-card/:id" element={<FlashCardDetail />} />
                <Route path="/flash-card/start/:id" element={<FlashCardStart />} />
                <Route path="/flash-card/test/:id" element={<FlashCardTest />} />
                {isAdmin && <Route path="/admin" element={<HomeAdminPage />} />}
                {isAdmin && <Route path="/admin/test" element={<TestAdminPage />} />}
                {isAdmin && <Route path="/admin/test/add-test" element={<AddTestPage />} />}
                {isAdmin && <Route path="/admin/test/add-part/:id" element={<AddPartPage />} />}
                {isAdmin && <Route path="/admin/test/:idtest/part/:idpart/:name/add-question" element={<AddQuestionPage />} />}
                {isAdmin && <Route path="/admin/flash-card" element={<FlashCardPage />} />}
            </Routers>
        </Suspense>
    );
}
