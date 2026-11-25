import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { AppPage } from './pages/AppPage'
import { ArticlePage, Blog } from './pages/Blog'
import { CategoryPage } from './pages/CategoryPage'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { PlacePage } from './pages/PlacePage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categories/:slug" element={<CategoryPage />} />
          <Route path="lieux/:id" element={<PlacePage />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<ArticlePage />} />
          <Route path="application" element={<AppPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
